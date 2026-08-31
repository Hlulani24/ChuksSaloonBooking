const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:mm
    stylist: { type: String, trim: true, default: "No preference" },
    notes: { type: String, trim: true, default: "" },
    // Services picked for this appointment
    services: [
      {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        name: String,
        price: Number,
        durationMinutes: Number,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "declined", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
