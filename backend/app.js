/**
 * @module app
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit';
import morgan from 'morgan';

import env from './config/env.js';
import constants from './utils/constants.js';
import routes from './routes/index.js';
import notFound from './middleware/notFound.middleware.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(compression());
app.use(cookieParser());

function makeQueryWritable(req, _res, next) {
  Object.defineProperty(req, 'query', {
    value: req.query,
    configurable: true,
    enumerable: true,
    writable: true,
  });
  return next();
}
app.use(makeQueryWritable);
app.use(mongoSanitize());
app.use(
  rateLimit({
    windowMs: constants.RATE_LIMIT_GLOBAL_WINDOW_MS,
    max: constants.RATE_LIMIT_GLOBAL_MAX,
    message: {
      success: false,
      message: 'Too many requests, please try again later',
      data: {},
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
