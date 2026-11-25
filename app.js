const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const env = require('./config/env');
const apiRoutes = require('./routes/api');
const { apiLimiter } = require('./middleware/rateLimiters');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1); // needed behind Render / Railway / Nginx so rate limiting sees real IPs

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
      },
    },
  })
);
app.use(compression());
app.use(cors({ origin: env.corsOrigin.length ? env.corsOrigin : false }));
app.use(express.json({ limit: '10kb' }));
if (!env.isProd) app.use(morgan('dev'));

app.use('/api', apiLimiter, apiRoutes);
app.use(express.static(path.join(__dirname, 'public'), { maxAge: env.isProd ? '7d' : 0 }));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
