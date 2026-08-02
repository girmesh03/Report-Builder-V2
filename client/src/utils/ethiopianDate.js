/**
 * @module utils/ethiopianDate
 */

/**
 * Ethiopian calendar date.
 *
 * @typedef {Object} EthiopianDate
 * @property {number} year - Ethiopian year.
 * @property {number} month - Ethiopian month (1 = Meskerem, 13 = Pagume).
 * @property {number} day - Day of the Ethiopian month.
 */

const JDN_EPOCH = 1723856;
const JDN_INVERSE_EPOCH = 1724221;
const DAYS_PER_4_YEARS = 1461;
const DAYS_PER_YEAR = 365;
const DAYS_PER_ETHIOPIAN_MONTH = 30;
const FVF_L_OFFSET = 68569;
const FVF_CENTURY_DAYS = 146097;
const FVF_I_DIVISOR = 1461001;
const FVF_I_MULTIPLIER = 4000;
const FVF_I_RESTORE_DAYS = 31;
const FVF_J_MULTIPLIER = 80;
const FVF_J_DIVISOR = 2447;
const FVF_DAY_RESTORE = 80;
const FVF_MONTH_SHIFT = 11;
const FVF_YEAR_BASE = 49;

/** @type {string[]} English month names mapped to Ethiopian months (September…August + Pagume). */
const ETHIOPIAN_MONTH_NAMES = [
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Pagume',
];

/** @type {string[]} English day names in Ethiopian calendar order (starting Monday). */
const ETHIOPIAN_DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Converts a Gregorian date to a Julian Day Number.
 *
 * @param {number} year - Gregorian year.
 * @param {number} month - Gregorian month (1–12).
 * @param {number} day - Gregorian day.
 * @returns {number} The Julian Day Number (noon-based integer).
 */
function gregorianToJdn(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + DAYS_PER_YEAR * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

/**
 * Converts a Julian Day Number to a Gregorian date.
 *
 * Uses the Fliegel–Van Flandern algorithm (the standard inverse of the
 * Gregorian JDN formula).
 *
 * @param {number} jdn - The Julian Day Number.
 * @returns {{ year: number, month: number, day: number }} The Gregorian date.
 */
function jdnToGregorian(jdn) {
  let l = jdn + FVF_L_OFFSET;
  const n = Math.floor((4 * l) / FVF_CENTURY_DAYS);
  l = l - Math.floor((FVF_CENTURY_DAYS * n + 3) / 4);
  const i = Math.floor((FVF_I_MULTIPLIER * (l + 1)) / FVF_I_DIVISOR);
  l = l - Math.floor((DAYS_PER_4_YEARS * i) / 4) + FVF_I_RESTORE_DAYS;
  const j = Math.floor((FVF_J_MULTIPLIER * l) / FVF_J_DIVISOR);
  const day = l - Math.floor((FVF_J_DIVISOR * j) / FVF_DAY_RESTORE);
  const k = Math.floor(j / FVF_MONTH_SHIFT);
  const month = j + 2 - 12 * k;
  const year = 100 * (n - FVF_YEAR_BASE) + i + k;
  return { year, month, day };
}

/**
 * Converts a Julian Day Number to an Ethiopian date.
 *
 * @param {number} jdn - The Julian Day Number.
 * @returns {EthiopianDate} The Ethiopian date.
 */
function jdnToEthiopian(jdn) {
  const r = (jdn - JDN_EPOCH) % DAYS_PER_4_YEARS;
  const n = (r % DAYS_PER_YEAR) + DAYS_PER_YEAR * Math.floor(r / 1460);
  const year = 4 * Math.floor((jdn - JDN_EPOCH) / DAYS_PER_4_YEARS) + Math.floor(r / DAYS_PER_YEAR) - Math.floor(r / 1460);
  const month = Math.floor(n / DAYS_PER_ETHIOPIAN_MONTH) + 1;
  const day = (n % DAYS_PER_ETHIOPIAN_MONTH) + 1;
  return { year, month, day };
}

/**
 * Converts an Ethiopian date to a Julian Day Number.
 *
 * @param {number} year - Ethiopian year.
 * @param {number} month - Ethiopian month (1–13).
 * @param {number} day - Day of the Ethiopian month.
 * @returns {number} The Julian Day Number.
 */
function ethiopianToJdn(year, month, day) {
  return JDN_INVERSE_EPOCH + DAYS_PER_YEAR * (year - 1) + Math.floor(year / 4) + DAYS_PER_ETHIOPIAN_MONTH * (month - 1) + day - 1;
}

/**
 * Converts a Gregorian date to an Ethiopian date.
 *
 * @param {number} year - Gregorian year.
 * @param {number} month - Gregorian month (1–12).
 * @param {number} day - Gregorian day.
 * @returns {EthiopianDate} The Ethiopian date.
 */
export function gregorianToEthiopian(year, month, day) {
  return jdnToEthiopian(gregorianToJdn(year, month, day));
}

/**
 * Converts an Ethiopian date to a Gregorian date.
 *
 * @param {number} year - Ethiopian year.
 * @param {number} month - Ethiopian month (1–13).
 * @param {number} day - Day of the Ethiopian month.
 * @returns {{ year: number, month: number, day: number }} The Gregorian date.
 */
export function ethiopianToGregorian(year, month, day) {
  return jdnToGregorian(ethiopianToJdn(year, month, day));
}

/**
 * Formats an Ethiopian date as a DD-MM-YY string.
 *
 * @param {EthiopianDate} ethiopianDate - The Ethiopian date.
 * @returns {string} The formatted date (e.g. `25-02-18`).
 */
export function formatEthiopianDate(ethiopianDate) {
  const { year, month, day } = ethiopianDate;
  const twoDigitYear = String(year % 100).padStart(2, '0');
  return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${twoDigitYear}`;
}

export { ETHIOPIAN_MONTH_NAMES, ETHIOPIAN_DAY_NAMES };
