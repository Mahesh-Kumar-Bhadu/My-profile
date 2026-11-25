const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter = null;

function isConfigured() {
  const { host, user, pass, to } = env.smtp;
  return Boolean(host && user && pass && to);
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    });
  }
  return transporter;
}

// Sends the contact message to the portfolio owner. Returns true if sent.
async function sendContactEmail({ name, email, subject, message }) {
  if (!isConfigured()) {
    console.warn('Email not configured (SMTP_* / MAIL_TO). Message saved to database only.');
    return false;
  }
  await getTransporter().sendMail({
    from: `"Portfolio Contact" <${env.smtp.user}>`,
    to: env.smtp.to,
    replyTo: email,
    subject: `Portfolio: ${subject || 'New message'} (from ${name})`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  return true;
}

module.exports = { sendContactEmail };
