const Contact = require('../models/Contact');
const { sendContactEmail } = require('../services/emailService');
const asyncHandler = require('../middleware/asyncHandler');

exports.createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Save to the database first so nothing is lost.
  const contact = await Contact.create({ name, email, subject, message, ip: req.ip });

  // 2. Try to email the owner. A mail failure should not lose the message.
  try {
    contact.emailSent = await sendContactEmail({ name, email, subject, message });
    await contact.save();
  } catch (err) {
    console.error('Email failed:', err.message);
  }

  res.status(201).json({ success: true, message: 'Thanks! Your message has been sent.' });
});
