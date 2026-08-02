/**
 * @module utils/httpStatus
 */

/** @type {number} 200 - The request succeeded. */
export const OK = 200;

/** @type {number} 201 - A resource was created. */
export const CREATED = 201;

/** @type {number} 400 - Malformed or semantically invalid request. */
export const BAD_REQUEST = 400;

/** @type {number} 401 - Missing, invalid, or expired credentials. */
export const UNAUTHORIZED = 401;

/** @type {number} 404 - The requested resource was not found. */
export const NOT_FOUND = 404;

/** @type {number} 409 - State conflict, e.g. a duplicate unique value. */
export const CONFLICT = 409;

/** @type {number} 413 - Uploaded payload exceeds the allowed size. */
export const PAYLOAD_TOO_LARGE = 413;

/** @type {number} 415 - Unsupported media type. */
export const UNSUPPORTED_MEDIA_TYPE = 415;

/** @type {number} 422 - Request failed validation. */
export const UNPROCESSABLE_ENTITY = 422;

/** @type {number} 429 - Rate limit exceeded. */
export const TOO_MANY_REQUESTS = 429;

/** @type {number} 500 - Unexpected server error. */
export const INTERNAL_SERVER_ERROR = 500;

/** @type {number} 502 - Upstream provider error. */
export const BAD_GATEWAY = 502;
