/**
 * @module utils/logger
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import env from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logsDir = path.resolve(__dirname, '..', 'logs');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => {
    const { timestamp, level, label, message, statusCode, stack } = info;
    const source = label ? ` [${label}]` : '';
    const status = statusCode ? ` status=${statusCode}` : '';
    const trace = stack ? `\n${stack}` : '';
    return `${timestamp} ${level.toUpperCase()}${source}${status} ${message}${trace}`;
  }),
);

const fileTransport = new DailyRotateFile({
  dirname: logsDir,
  filename: 'backend-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  zippedArchive: false,
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    logFormat,
  ),
});

/**
 * Application-wide Winston logger writing daily-rotated files
 * (30-day auto-delete) and the console.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  transports: [fileTransport, consoleTransport],
});

/**
 * Creates a child logger carrying a module label (Server, DB, Auth,
 * AI-Addis, AI-Gemini, AI-Nvidia).
 *
 * @param {string} label - The module label for the child logger.
 * @returns {winston.Logger} A child logger scoped to the label.
 */
export const createChildLogger = (label) => logger.child({ label });

export default logger;
