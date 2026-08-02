/**
 * @module utils/error
 */

/**
 * Operational error carrying an HTTP status and an isOperational flag.
 * @extends Error
 */
export class CustomError extends Error {
  /**
   * @param {number} statusCode - HTTP status for the response.
   * @param {string} message - Client-safe error message.
   * @param {boolean} [isOperational] - True for expected, handled errors.
   */
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
