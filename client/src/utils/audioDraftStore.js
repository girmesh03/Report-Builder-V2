/**
 * @module utils/audioDraftStore
 */

import {
  AUDIO_DRAFT_DB_NAME,
  AUDIO_DRAFT_DB_VERSION,
  AUDIO_DRAFT_STORE_NAME,
} from "./constants.js";

/**
 * Durable client-side store for recorded-but-unsubmitted audio clips (Phase
 * 4 corrections, user decision): when report creation fails at the audio
 * step, the supervisor's recordings must survive the dialog close and even
 * a page refresh, so they can be retried — never re-recorded (REQ-140
 * exception, spec-amended). Two tiers, both always mirrored:
 *
 * 1. IndexedDB — durable across refreshes; one record per user, keyed
 *    `audio-draft:<userId>`, shape `{ clips: [{ id, blob, duration,
 *    mimeType, createdAt }] }` (object URLs are not stored; they are
 *    re-created on restore).
 * 2. Module memory — fallback when IndexedDB is unavailable (private mode,
 *    storage policy, quota); survives dialog close and SPA navigation but
 *    not a refresh. `saveAudioDraft` resolves `false` in that case so the
 *    consumer can warn the user once.
 *
 * `memoryAuthoritative` marks a user's key after an IndexedDB write fails:
 * the freshest record lives in memory, and reading the older IndexedDB
 * record back would shadow it. While a key is marked, `loadAudioDraft` goes
 * straight to the memory tier; a later successful write or clear removes the
 * mark (F-4-17b).
 *
 * Never throws: failures fall through to the memory tier or resolve to the
 * last known value.
 */

/** @type {Map<string, { clips: object[] }>} Module-level memory tier (REQ-140 exception). */
const memoryTier = new Map();

/** @type {Set<string>} User keys whose memory tier is fresher than IndexedDB (F-4-17b). */
const memoryAuthoritative = new Set();

/**
 * Builds the per-user IndexedDB record key.
 *
 * @param {string} userId - The authenticated user's id.
 * @returns {string} The record key.
 */
function draftKey(userId) {
  return `audio-draft:${userId}`;
}

/**
 * Opens the audio drafts database (creates the object store on first run).
 *
 * @returns {Promise<IDBDatabase>} The open database.
 */
function openDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }
    const request = indexedDB.open(AUDIO_DRAFT_DB_NAME, AUDIO_DRAFT_DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(AUDIO_DRAFT_STORE_NAME)) {
        request.result.createObjectStore(AUDIO_DRAFT_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
  });
}

/**
 * Loads the user's preserved clips (IndexedDB first, then the memory tier).
 *
 * @param {string} userId - The authenticated user's id.
 * @returns {Promise<{ clips: Array<{ id: string, blob: Blob, duration: number, mimeType: string, createdAt: number }> } | null>} The preserved draft, or null when none.
 */
export async function loadAudioDraft(userId) {
  const key = draftKey(userId);
  if (memoryAuthoritative.has(key)) {
    return memoryTier.get(key) ?? null;
  }
  try {
    const db = await openDatabase();
    const record = await new Promise((resolve, reject) => {
      const transaction = db.transaction(AUDIO_DRAFT_STORE_NAME, "readonly");
      const request = transaction.objectStore(AUDIO_DRAFT_STORE_NAME).get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error ?? new Error("Failed to read draft"));
    });
    db.close();
    return record;
  } catch {
    return memoryTier.get(key) ?? null;
  }
}

/**
 * Persists the user's clips. Only persistable fields are stored (object
 * URLs are recreated on restore). Always mirrors into the memory tier.
 *
 * @param {string} userId - The authenticated user's id.
 * @param {Array<{ id: string, blob: Blob, duration: number, mimeType: string, createdAt?: number }>} clips - The current clips.
 * @returns {Promise<boolean>} True when the IndexedDB tier accepted the write, false when only the memory tier holds it.
 */
export async function saveAudioDraft(userId, clips) {
  const key = draftKey(userId);
  const record = {
    clips: clips.map((clip) => ({
      id: clip.id,
      blob: clip.blob,
      duration: clip.duration,
      mimeType: clip.mimeType,
      createdAt: clip.createdAt ?? Date.now(),
    })),
  };
  memoryTier.set(key, record);
  try {
    const db = await openDatabase();
    const accepted = await new Promise((resolve, reject) => {
      const transaction = db.transaction(AUDIO_DRAFT_STORE_NAME, "readwrite");
      transaction.objectStore(AUDIO_DRAFT_STORE_NAME).put(record, key);
      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => reject(transaction.error ?? new Error("Failed to write draft"));
    });
    db.close();
    memoryAuthoritative.delete(key);
    return accepted;
  } catch {
    memoryAuthoritative.add(key);
    return false;
  }
}

/**
 * Removes the user's preserved draft from both tiers (called after a
 * successful audio upload — the clips then live server-side).
 *
 * @param {string} userId - The authenticated user's id.
 * @returns {Promise<void>}
 */
export async function clearAudioDraft(userId) {
  const key = draftKey(userId);
  memoryTier.delete(key);
  memoryAuthoritative.delete(key);
  try {
    const db = await openDatabase();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(AUDIO_DRAFT_STORE_NAME, "readwrite");
      transaction.objectStore(AUDIO_DRAFT_STORE_NAME).delete(key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("Failed to clear draft"));
    });
    db.close();
  } catch {
    // Memory tier is already cleared.
  }
}
