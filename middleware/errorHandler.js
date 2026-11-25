const env = require('../config/env');

function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Route not found' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: env.isProd ? 'Something went wrong' : err.message,
  });
}

module.exports = { notFound, errorHandler };
