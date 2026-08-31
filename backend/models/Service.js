const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    category: {
      type: String,
      required: true,
      enum: ["Hair", "Nails", "Skin & Facials", "Makeup", "Spa & Massage", "Bridal"],
      default: "Hair",
    },
    price: { type: Number, required: true, min: 0 },
    durationMinutes: { type: Number, required: true, min: 5, default: 30 },
    isSpecial: { type: Boolean, default: false },
    // Original price shown struck-through when isSpecial is true (e.g. was R350 -> now R280)
    originalPrice: { type: Number, min: 0, default: null },
    image: { type: String, default: "" }, // relative path e.g. /uploads/services/xyz.jpg
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
