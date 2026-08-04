/**
 * @module server
 */

import { createHash } from 'node:crypto';

import mongoose from 'mongoose';

import env from './config/env.js';
import { connectDatabase } from './config/db.js';
import app from './app.js';
import constants from './utils/constants.js';
import { createChildLogger } from './utils/logger.js';

const serverLogger = createChildLogger('Server');

const secretFingerprint = createHash('sha256')
  .update(`${env.JWT_ACCESS_SECRET}:${env.JWT_REFRESH_SECRET}`)
  .digest('hex')
  .slice(0, 12);

const server = app.listen(env.PORT, () => {
  serverLogger.info(`Server listening on port ${env.PORT}`);
  serverLogger.info(`JWT secret fingerprint: ${secretFingerprint}`);
});

connectDatabase()
  .then(() => {
    serverLogger.info('Database connection established');
  })
  .catch((error) => {
    serverLogger.error('Database connection failed', { error: error.message });
  });

let shuttingDown = false;

/**
 * Graceful shutdown on SIGINT/SIGTERM (REQ-084): close the HTTP server, then
 * close the mongoose connection and exit; force-exit if the sequence hangs
 * (REQ-205).
 *
 * @param {string} signal - The received signal name.
 * @returns {Promise<void>}
 */
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  serverLogger.info(`Received ${signal}, shutting down gracefully`);
  const forceExitTimer = setTimeout(() => {
    serverLogger.error('Shutdown timed out, forcing exit');
    process.exit(1);
  }, constants.SHUTDOWN_FORCE_EXIT_TIMEOUT_MS);
  forceExitTimer.unref();
  server.close(() => {
    serverLogger.info('HTTP server closed');
    mongoose.connection
      .close()
      .then(() => {
        serverLogger.info('Database connection closed');
        process.exit(1);
      })
      .catch(() => {
        process.exit(1);
      });
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
