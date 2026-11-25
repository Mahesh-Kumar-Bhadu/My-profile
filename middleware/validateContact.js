const { body, validationResult } = require('express-validator');

const rules = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2 to 80 characters').escape(),
  body('email').trim().isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('subject').optional({ values: 'falsy' }).trim().isLength({ max: 120 }).withMessage('Subject is too long').escape(),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10 to 2000 characters').escape(),
];

function check(req, res, next) {
  // Hidden "website" field: real people leave it empty, bots fill it in.
  if (req.body.website) {
    return res.status(200).json({ success: true, message: 'Thanks!' });
  }
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((e) => ({ field: e.path, message: e.msg }));
    return res.status(422).json({ success: false, message: errors[0].message, errors });
  }
  next();
}

module.exports = [...rules, check];
