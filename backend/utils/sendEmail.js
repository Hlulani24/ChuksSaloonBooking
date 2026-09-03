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

const bookingEmailTemplate = (booking, forSalon = false) => {
  const total = (booking.services || []).reduce((sum, s) => sum + (s.price || 0), 0);
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
    <h2 style="color:#A8586B;">${forSalon ? "New appointment received" : "Your appointment is booked with AMARA"}</h2>
    <p>${forSalon ? `A new appointment request has come in from <strong>${booking.name}</strong>.` : `Hi ${booking.name}, thanks for booking with AMARA Hair &amp; Beauty. Here are your details:`}</p>
    <table style="width:100%; border-collapse: collapse;">
      <tr><td style="padding:6px 0;color:#666;">Date</td><td style="padding:6px 0;"><strong>${booking.date}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#666;">Time</td><td style="padding:6px 0;"><strong>${booking.time}</strong></td></tr>
      ${booking.stylist ? `<tr><td style="padding:6px 0;color:#666;">Stylist</td><td style="padding:6px 0;"><strong>${booking.stylist}</strong></td></tr>` : ""}
      <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;"><strong>${booking.phone}</strong></td></tr>
      ${booking.notes ? `<tr><td style="padding:6px 0;color:#666;">Notes</td><td style="padding:6px 0;">${booking.notes}</td></tr>` : ""}
      <tr><td style="padding:6px 0;color:#666;">Status</td><td style="padding:6px 0;"><strong>${booking.status}</strong></td></tr>
    </table>
    ${
      booking.services && booking.services.length
        ? `<table style="width:100%; border-collapse: collapse; margin-top:14px; border-top:1px dashed #ccc; padding-top:8px;">
            <tr><td colspan="2" style="padding:8px 0 4px; font-weight:bold;">${forSalon ? "Services requested" : "Your services"}</td></tr>
            ${booking.services
              .map(
                (s) =>
                  `<tr><td style="padding:2px 0;">${s.name}</td><td style="text-align:right;">R${s.price}</td></tr>`
              )
              .join("")}
            <tr><td style="padding:6px 0; font-weight:bold; border-top:1px dashed #ccc;">Total</td><td style="text-align:right; font-weight:bold; border-top:1px dashed #ccc;">R${total}</td></tr>
          </table>`
        : `<p style="color:#888; margin-top:12px;">No specific services requested yet — we'll confirm what's available for this slot.</p>`
    }
    <p style="margin-top:16px;color:#666;font-size:13px;">AMARA Hair &amp; Beauty — we'll confirm this appointment shortly.</p>
  </div>
`;
};

const passwordResetEmail = (resetUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
    <h2 style="color:#A8586B;">Reset your AMARA password</h2>
    <p>We received a request to reset your password. Click the button below to choose a new one — this link expires in 30 minutes.</p>
    <p style="margin: 24px 0;">
      <a href="${resetUrl}" style="background:#A8586B; color:#fff; padding:12px 24px; border-radius:999px; text-decoration:none; font-weight:600; display:inline-block;">
        Reset password
      </a>
    </p>
    <p style="color:#888; font-size:13px;">If you didn't request this, you can safely ignore this email — your password won't be changed.</p>
    <p style="color:#888; font-size:12px; word-break:break-all;">Or paste this link into your browser: ${resetUrl}</p>
  </div>
`;

module.exports = { sendEmail, bookingEmailTemplate, passwordResetEmail };
