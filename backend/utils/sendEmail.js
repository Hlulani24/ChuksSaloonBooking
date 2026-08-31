const nodemailer = require("nodemailer");

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not set — emails will be logged to the console instead of sent.");
    return null;
  }
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  return transporter;
};

const sendEmail = async ({ to, subject, html }) => {
  const t = getTransporter();
  if (!t) {
    console.log(`\n--- [DEV EMAIL] ---\nTo: ${to}\nSubject: ${subject}\n${html}\n-------------------\n`);
    return;
  }
  await t.sendMail({ from: process.env.EMAIL_FROM || process.env.EMAIL_USER, to, subject, html });
};

const bookingEmailTemplate = (booking, forSalon = false) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
    <h2 style="color:#A8586B;">${forSalon ? "New appointment received" : "Your appointment is booked with AMARA"}</h2>
    <p>${forSalon ? `A new appointment request has come in from <strong>${booking.name}</strong>.` : `Hi ${booking.name}, thanks for booking with AMARA Hair &amp; Beauty. Here are your details:`}</p>
    <table style="width:100%; border-collapse: collapse;">
      <tr><td style="padding:6px 0;color:#666;">Date</td><td style="padding:6px 0;"><strong>${booking.date}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Time</td><td style="padding:6px 0;"><strong>${booking.time}</strong></td></tr>
      ${booking.stylist ? `<tr><td style="padding:6px 0;color:#666;">Stylist</td><td style="padding:6px 0;"><strong>${booking.stylist}</strong></td></tr>` : ""}
      ${booking.services && booking.services.length ? `<tr><td style="padding:6px 0;color:#666;vertical-align:top;">Services</td><td style="padding:6px 0;">${booking.services.map((s) => s.name).join(", ")}</td></tr>` : ""}
      <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;"><strong>${booking.phone}</strong></td></tr>
      ${booking.notes ? `<tr><td style="padding:6px 0;color:#666;">Notes</td><td style="padding:6px 0;">${booking.notes}</td></tr>` : ""}
      <tr><td style="padding:6px 0;color:#666;">Status</td><td style="padding:6px 0;"><strong>${booking.status}</strong></td></tr>
    </table>
    <p style="margin-top:16px;color:#666;font-size:13px;">AMARA Hair &amp; Beauty — we'll confirm this appointment shortly.</p>
  </div>
`;

module.exports = { sendEmail, bookingEmailTemplate };
