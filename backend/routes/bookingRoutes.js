const express = require("express");
const Booking = require("../models/Booking");
const { protect, restrictTo } = require("../middleware/auth");
const { sendEmail, bookingEmailTemplate } = require("../utils/sendEmail");
const { buildWhatsAppLink, bookingWhatsAppMessage, trySendViaTwilio } = require("../utils/sendWhatsApp");

const router = express.Router();

// POST /api/bookings — public (works for guests) or logged-in customers
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, stylist, notes, services, userId } = req.body;
    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const booking = await Booking.create({
      user: userId || null,
      name,
      email,
      phone,
      date,
      time,
      stylist,
      notes,
      services: services || [],
    });

    // Fire-and-forget notifications — booking still succeeds even if these fail.
    try {
      await sendEmail({
        to: email,
        subject: "Your appointment request — AMARA Hair & Beauty",
        html: bookingEmailTemplate(booking, false),
      });
      await sendEmail({
        to: process.env.SALON_NOTIFY_EMAIL,
        subject: `New appointment: ${name} — ${date} ${time}`,
        html: bookingEmailTemplate(booking, true),
      });
    } catch (e) {
      console.warn("Email notification failed:", e.message);
    }

    const waMessage = bookingWhatsAppMessage(booking);
    const salonWaLink = buildWhatsAppLink(process.env.SALON_WHATSAPP_NUMBER, waMessage);
    trySendViaTwilio(process.env.SALON_WHATSAPP_NUMBER, waMessage).catch(() => {});

    res.status(201).json({ booking, whatsappLink: salonWaLink });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/bookings/mine — logged-in customer's own bookings
router.get("/mine", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings — admin only, all bookings
router.get("/", protect, restrictTo("admin"), async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/bookings/:id/status — admin only, confirm/decline/complete
router.patch("/:id/status", protect, restrictTo("admin"), async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    try {
      await sendEmail({
        to: booking.email,
        subject: `Your AMARA appointment is ${status}`,
        html: bookingEmailTemplate(booking, false),
      });
    } catch (e) {
      console.warn("Status update email failed:", e.message);
    }

    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
