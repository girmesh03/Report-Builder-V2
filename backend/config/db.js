/**
 * @module config/db
 * @description Mongoose connection/options consumed by `server.js` (§25.1).
 * Connects to MongoDB using the frozen `env` object from `config/env.js`;
 * connection events are logged through the Winston `DB` child logger.
 */

import mongoose from 'mongoose';

import env from './env.js';
import { createChildLogger } from '../utils/logger.js';

const dbLogger = createChildLogger('DB');

/**
 * Opens the MongoDB connection and wires connection-event logging.
 * @returns {Promise<typeof mongoose.connection>} The active mongoose connection.
 */
export async function connectDatabase() {
  mongoose.connection.on('connected', () => {
    dbLogger.info('MongoDB connected');
  });
  mongoose.connection.on('error', (error) => {
    dbLogger.error('MongoDB connection error', { error: error.message });
  });
  mongoose.connection.on('disconnected', () => {
    dbLogger.warn('MongoDB disconnected');
  });

  await mongoose.connect(env.MONGODB_URI);
  return mongoose.connection;
}
