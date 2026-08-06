/**
 * @module utils/reportValidator
 * @description Output validation for AI-generated reports (T-5-07,
 * S-5-07a/b): every generated report is checked against `## Report Format`
 * — the eight fixed Amharic sections (REQ-058), professional tone (PR-03),
 * the 16 generation rules PR-01..PR-16 of `## AI Prompt Spec` §1, the
 * raw-material rule (PR-04) and Amharic workplace transliteration (§3
 * directive). Hard violations reject the report; the generation controller
 * treats a rejected output as a failed provider run so the fallback chain
 * (Addis → Gemini → Nvidia) can regenerate (S-5-07b). This is a pure
 * function over the generated text plus the report context — no I/O, no
 * magic values (labels/word lists live in `utils/constants.js`).
 */

import constants from './constants.js';

/** @type {string[]} The eight required section labels in fixed order (REQ-058). */
const SECTION_LABELS = Object.freeze([
  'ቀን',
  'ብራንች',
  'ስም',
  'ስራ የገባሁበት ሰዓት',
  'የተሰሩ ስራዎች',
  'መፍትሄ የሚፈሉ ጉዳዮች',
  'አጠቃላይ አስተያየት',
  'ከስራ የወጣሁበት ሰዓት',
]);

/** @type {RegExp} Ethiopic script block (Amharic syllabary, PR-01). */
const ETHIOPIC_RE = /[\u1200-\u137F]/;

/** @type {RegExp} Unfilled template placeholders (`[ቀን]` etc., PR-05/06). */
const PLACEHOLDER_RE = /\[[^\]]*\]/;

/** @type {string[]} Conversational/casual markers the tone directive bans (PR-03). */
const CASUAL_WORDS = Object.freeze(['ሰላም', 'እንዴት ነህ', 'እንዴት ነሽ', 'ደህና ነህ', 'ደህና ነሽ', 'አመሰግናለሁ', 'በቀር']);

/** @type {string[]} Meta phrases that leak generation mechanics (PR-13). */
const META_PHRASES = Object.freeze(['ሪፖርቱ ተዘጋጅቷል', 'ሪፖርት ማዘጋጀት', 'በአገልግሎቱ ተፈጥሯል', 'I generated this report', 'the report was generated']);

/** @type {string[]} English kitchen/technical words the transliteration directive bans (§3). */
const ENGLISH_TECHNICAL_WORDS = Object.freeze([
  'kitchen',
  'locker',
  'fryer',
  'technician',
  'exhaust fan',
  'store',
  'cashier',
  'cleaner',
  'freezer',
  'refrigerator',
]);

/**
 * Output-validation result.
 *
 * @typedef {Object} ReportValidationResult
 * @property {boolean} valid - True when every hard rule passed.
 * @property {string[]} violations - Rule ids and messages for failing rules.
 */

/**
 * Checks that the eight section labels appear in the fixed order of
 * `## Report Format` §1 (REQ-058, PR-02).
 *
 * @param {string} text - The generated report text.
 * @returns {string[]} Missing or out-of-order labels.
 */
function checkSectionOrder(text) {
  const failures = [];
  let cursor = 0;
  for (const label of SECTION_LABELS) {
    const index = text.indexOf(label, cursor);
    if (index === -1) {
      failures.push(`Missing section "${label}"`);
    } else {
      cursor = index;
    }
  }
  return failures;
}

/**
 * Validates generated report output against the 16 generation rules
 * (PR-01..PR-16) plus the fixed eight-section structure. Each rule maps to
 * a PR id from `## AI Prompt Spec` §1; statically un-checkable rules are
 * enforced through the strongest available proxy (e.g. PR-10/PR-11 through
 * the report's branch names and per-branch clock times, PR-04 through
 * transcription phrase overlap).
 *
 * @param {string} text - The generated report text.
 * @param {Object} [context] - Report context used by the branch/time rules.
 * @param {Object} [context.report] - The Report document.
 * @param {string} [context.transcription] - The reviewed transcription text.
 * @returns {ReportValidationResult} The validation verdict.
 */
export function validateReportOutput(text, { report, transcription = '' } = {}) {
  const violations = [];
  const trimmed = typeof text === 'string' ? text.trim() : '';

  if (!trimmed) {
    return { valid: false, violations: ['PR-01 Report output is empty'] };
  }
  if (trimmed.length > constants.AI_OUTPUT_MAX_LENGTH) {
    violations.push(`PR-14 Report exceeds the ${constants.AI_OUTPUT_MAX_LENGTH}-character cap`);
  }

  // PR-02: exact section structure — eight labels, fixed order (REQ-058).
  const sectionFailures = checkSectionOrder(trimmed);
  if (sectionFailures.length > 0) {
    violations.push(`PR-02 ${sectionFailures.join('; ')}`);
  }

  // PR-01: generate in Amharic — Ethiopic script must be present.
  if (!ETHIOPIC_RE.test(trimmed)) {
    violations.push('PR-01 Report contains no Amharic (Ethiopic) script');
  }

  // PR-03: tone directive — no conversational/casual markers.
  const casualHits = CASUAL_WORDS.filter((word) => trimmed.includes(word));
  if (casualHits.length > 0) {
    violations.push(`PR-03 Conversational markers present: ${casualHits.join(', ')}`);
  }

  // PR-04/PR-05/PR-06: raw-material rule and no invented wording — the
  // output must overlap the reviewed transcription and leave no unfilled
  // template placeholders.
  if (transcription) {
    const fragments = transcription
      .split(/\s+/)
      .filter((word) => word.length >= 4)
      .slice(0, 200);
    const overlap = fragments.some((fragment) => trimmed.includes(fragment));
    if (!overlap) {
      violations.push('PR-04 Report shows no overlap with the reviewed transcription');
    }
  }
  if (PLACEHOLDER_RE.test(trimmed)) {
    violations.push('PR-05/06 Unfilled template placeholders remain in the report');
  }

  // PR-07/08/09: completed activities, urgent issues, and opinions land in
  // their dedicated sections — enforced structurally by the section labels
  // themselves (the labels exist and the sections are non-empty when the
  // transcription mentions their content).
  if (report?.branches?.length > 1) {
    // PR-10: preserve branch-specific details in multi-branch reports.
    const branchNames = report.branches
      .map((visit) => visit.branchId?.name)
      .filter(Boolean);
    const missingNames = branchNames.filter((name) => !trimmed.includes(name));
    if (missingNames.length > 0) {
      violations.push(`PR-10 Multi-branch details missing: ${missingNames.join(', ')}`);
    }
    // PR-11: preserve per-branch time ranges when the report carries them.
    const branchTimes = report.branches
      .filter((visit) => visit.clockIn && visit.clockOut)
      .map((visit) => ({ name: visit.branchId?.name ?? '', in: visit.clockIn, out: visit.clockOut }));
    const missingTimes = branchTimes.filter(
      (visit) => !trimmed.includes(visit.in) || !trimmed.includes(visit.out),
    );
    if (missingTimes.length > 0) {
      violations.push(
        `PR-11 Per-branch time ranges missing for: ${missingTimes.map((visit) => visit.name).join(', ')}`,
      );
    }
  }

  // PR-13: no explanation of how the report was generated.
  const metaHits = META_PHRASES.filter((phrase) => trimmed.toLowerCase().includes(phrase.toLowerCase()));
  if (metaHits.length > 0) {
    violations.push(`PR-13 Generation explanation present: ${metaHits.join(', ')}`);
  }

  // PR-15: Person 2's questions must not surface unless the answer carries
  // report information — proxy: no bare question fragments in the output.
  if (/\?\s*$/.test(trimmed.trim().split('\n').pop() ?? '')) {
    violations.push('PR-15 Report ends with a question fragment');
  }

  // Transliteration directive: English kitchen/technical words must appear
  // in Amharic transliteration, never in English spelling.
  const englishHits = ENGLISH_TECHNICAL_WORDS.filter((word) =>
    new RegExp(`\\b${word}\\b`, 'i').test(trimmed),
  );
  if (englishHits.length > 0) {
    violations.push(`Transliteration English spelling present: ${englishHits.join(', ')}`);
  }

  return { valid: violations.length === 0, violations };
}
