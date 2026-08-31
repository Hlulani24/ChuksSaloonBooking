// Run with: npm run seed  (from /backend)
// Creates the first admin account and a handful of starter services.
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Service = require("../models/Service");

const run = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@amarabeauty.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "AMARA Admin",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
      role: "admin",
    });
    console.log(`Admin account created: ${adminEmail}`);
  } else {
    console.log("Admin account already exists, skipping.");
  }

  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany([
      {
        name: "Silk Press & Trim",
        description: "Wash, deep condition, silk press blowout and a precision trim.",
        category: "Hair",
        price: 280,
        durationMinutes: 90,
        isSpecial: true,
        originalPrice: 350,
        available: true,
      },
      {
        name: "Box Braids (Medium)",
        description: "Full head medium box braids, shoulder length, synthetic hair included.",
        category: "Hair",
        price: 650,
        durationMinutes: 240,
        available: true,
      },
      {
        name: "Gel Manicure",
        description: "Shape, cuticle care and a long-lasting gel polish finish.",
        category: "Nails",
        price: 180,
        durationMinutes: 45,
        isSpecial: true,
        originalPrice: 230,
        available: true,
      },
      {
        name: "Signature Facial",
        description: "Deep cleanse, exfoliation and hydration facial tailored to your skin type.",
        category: "Skin & Facials",
        price: 320,
        durationMinutes: 60,
        available: true,
      },
      {
        name: "Bridal Makeup Trial",
        description: "Full glam trial run ahead of the big day, includes lashes.",
        category: "Bridal",
        price: 450,
        durationMinutes: 75,
        available: true,
      },
      {
        name: "Hot Stone Massage",
        description: "60-minute full body massage using warmed basalt stones.",
        category: "Spa & Massage",
        price: 380,
        durationMinutes: 60,
        available: true,
      },
    ]);
    console.log("Starter services created.");
  } else {
    console.log("Services already exist, skipping seed.");
  }

  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
