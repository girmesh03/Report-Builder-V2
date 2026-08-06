/**
 * @module utils/promptSeeds
 * @description Assembled AI prompt builders (T-5-01, S-5-01b): the 18
 * prompt seeds PR-01..18, the tone directive, the transliteration
 * directive, and the few-shot sample all live as frozen constants in
 * `utils/constants.js` (`## AI Prompt Spec` §1–5). This module is the only
 * place that assembles them into the final directive text sent through
 * `chat_generate` (Addis), Gemini `contents`/`systemInstruction`, or the
 * Nvidia message format — controllers pass report context and never
 * contain prompt wording (S-5-01b, REQ-146/147).
 */

import constants from './constants.js';

/**
 * Renders the report context block (transcription + report metadata) that
 * rides in the generation and correction prompts as raw material
 * (PR-04 — reviewed transcription is the source of truth, never raw audio).
 *
 * @param {Object} context - Report context.
 * @param {string} context.transcriptionText - The reviewed transcription text (`latest`).
 * @param {Object} [context.report] - The Report document (date, branches, clock times).
 * @returns {string} The context block.
 */
function buildContextBlock({ transcriptionText, report }) {
  const lines = ['Report metadata:'];
  if (report?.date) lines.push(`Date: ${report.date}`);
  if (report?.branches?.length > 0) {
    const names = report.branches.map((visit) => visit.branchId?.name ?? '').filter(Boolean);
    if (names.length > 0) lines.push(`Branches: ${names.join(', ')}`);
    for (const visit of report.branches) {
      if (visit.clockIn || visit.clockOut) {
        lines.push(`Branch ${visit.branchId?.name ?? ''}: in ${visit.clockIn || 'n/a'}, out ${visit.clockOut || 'n/a'}`);
      }
    }
  }
  lines.push('');
  lines.push('Reviewed transcription (source of truth):');
  lines.push(transcriptionText || '(empty transcription)');
  return lines.join('\n');
}

/**
 * Builds the report-generation prompt: every PR-01..18 seed, the tone and
 * transliteration directives, the required format template, the few-shot
 * sample (`## AI Prompt Spec` §1, §3–5), and the report context.
 *
 * @param {Object} context - Report context for `buildContextBlock`.
 * @returns {string} The assembled generation prompt.
 */
export function buildGenerationPrompt(context) {
  const seeds = Object.values(constants.AI_PROMPT_SEEDS);
  return [
    constants.AI_SYSTEM_PROMPT_GENERATION,
    ...seeds.map((seed) => `- ${seed}`),
    `- ${constants.AI_TONE_DIRECTIVE}`,
    `- ${constants.AI_TRANSLITERATION_DIRECTIVE}`,
    '',
    'Required report format (eight sections, exact labels):',
    constants.AI_REPORT_FORMAT_TEMPLATE,
    '',
    'Reference transformation example:',
    constants.AI_FEW_SHOT_EXAMPLE,
    '',
    buildContextBlock(context),
  ].join('\n');
}

/**
 * Builds the report correction prompt from the correction system prompt
 * (REQ-147) plus the seeds relevant to corrections (PR-16) and the report
 * context — used when the user requests corrections to an existing
 * generated report (W-05..W-10).
 *
 * @param {Object} context - Report context for `buildContextBlock`.
 * @returns {string} The assembled correction prompt.
 */
export function buildCorrectionPrompt(context) {
  const seeds = Object.values(constants.AI_PROMPT_SEEDS);
  return [
    constants.AI_SYSTEM_PROMPT_CORRECTION,
    ...seeds.map((seed) => `- ${seed}`),
    `- ${constants.AI_TONE_DIRECTIVE}`,
    '',
    'Required report format (eight sections, exact labels):',
    constants.AI_REPORT_FORMAT_TEMPLATE,
    '',
    buildContextBlock(context),
  ].join('\n');
}

/**
 * Builds the transcription-correction prompt (T-5-04b regeneration lane): the
 * dedicated transcription system prompt plus the raw transcription as the
 * editable material. The output is a corrected transcription — never a report
 * structure — so no format template or tone directive is appended.
 *
 * @param {Object} context - The transcription correction context.
 * @param {string} context.transcriptionText - The raw/latest transcription to correct.
 * @returns {string} The assembled transcription-correction prompt.
 */
export function buildTranscriptionCorrectionPrompt({ transcriptionText }) {
  return [constants.AI_SYSTEM_PROMPT_TRANSCRIPTION_CORRECTION, '', 'Transcription to correct:', transcriptionText || '(empty transcription)'].join(
    '\n',
  );
}