const express = require('express');
const portfolio = require('../controllers/portfolioController');
const contact = require('../controllers/contactController');
const validateContact = require('../middleware/validateContact');
const { contactLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.get('/profile', portfolio.getProfile);
router.get('/projects', portfolio.getProjects);
router.get('/skills', portfolio.getSkills);
router.get('/edits', portfolio.getEdits);
router.post('/contact', contactLimiter, validateContact, contact.createContact);

module.exports = router;
