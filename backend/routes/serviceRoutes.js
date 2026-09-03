const express = require("express");
const Service = require("../models/Service");
const { protect, restrictTo } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// GET /api/services  — public, everyone browsing the site
router.get("/", async (req, res) => {
  try {
    const items = await Service.find().sort({ category: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/services — admin only, with optional image upload
router.post("/", protect, restrictTo("admin"), upload.single("image"), async (req, res) => {
  try {
    const { name, description, category, price, durationMinutes, isSpecial, originalPrice, available } = req.body;
    const service = await Service.create({
      name,
      description,
      category,
      price,
      durationMinutes,
      isSpecial: isSpecial === "true" || isSpecial === true,
      originalPrice: originalPrice || null,
      available: available === undefined ? true : available === "true" || available === true,
      image: req.file ? (upload.usingCloudinary ? req.file.path : `/uploads/services/${req.file.filename}`) : "",
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/services/:id — admin only, edit details/price/specials, optionally replace image
router.put("/:id", protect, restrictTo("admin"), upload.single("image"), async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.isSpecial !== undefined) update.isSpecial = update.isSpecial === "true" || update.isSpecial === true;
    if (update.available !== undefined) update.available = update.available === "true" || update.available === true;
    if (req.file) update.image = upload.usingCloudinary ? req.file.path : `/uploads/services/${req.file.filename}`;

    const service = await Service.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/services/:id — admin only
router.delete("/:id", protect, restrictTo("admin"), async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
