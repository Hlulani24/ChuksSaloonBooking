// WhatsApp notification helper.
//
// Works out of the box with zero setup: builds a wa.me "click-to-chat" link with the
// appointment details pre-filled, which the frontend opens for the customer (or shows to
// the admin) — no WhatsApp Business API account required.
//
// If Twilio credentials are provided in .env, the server will ALSO send the message
// automatically via the Twilio WhatsApp API — fully optional.

const buildWhatsAppLink = (phoneNumber, message) => {
  const cleanNumber = String(phoneNumber).replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

const bookingWhatsAppMessage = (booking) =>
  `New AMARA appointment request:\n` +
  `Name: ${booking.name}\n` +
  `Date: ${booking.date} at ${booking.time}\n` +
  (booking.stylist ? `Stylist: ${booking.stylist}\n` : "") +
  (booking.services && booking.services.length ? `Services: ${booking.services.map((s) => s.name).join(", ")}\n` : "") +
  `Phone: ${booking.phone}\n` +
  (booking.notes ? `Notes: ${booking.notes}\n` : "") +
  `Status: ${booking.status}`;

// Best-effort auto-send via Twilio. Silently skips if not configured.
const trySendViaTwilio = async (toNumber, message) => {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
    return { sent: false, reason: "Twilio not configured — using wa.me link only" };
  }
  try {
    const twilio = require("twilio");
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    await client.messages.create({
      from: TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+${String(toNumber).replace(/\D/g, "")}`,
      body: message,
    });
    return { sent: true };
  } catch (err) {
    console.warn("Twilio WhatsApp send failed:", err.message);
    return { sent: false, reason: err.message };
  }
};

module.exports = { buildWhatsAppLink, bookingWhatsAppMessage, trySendViaTwilio };
