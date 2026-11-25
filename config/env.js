// Reads and checks environment variables in one place.
require('dotenv').config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI,
  corsOrigin: (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean),
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    to: process.env.MAIL_TO,
  },
};

env.isProd = env.nodeEnv === 'production';

if (!env.mongoUri) {
  console.error('Missing MONGODB_URI. Copy .env.example to .env and set it.');
  process.exit(1);
}

module.exports = env;
