/**
 * @module utils/wavSplitter
 */

import constants from './constants.js';

const CHUNK_ID_SIZE = 4;
const CHUNK_SIZE_FIELD_SIZE = 4;
const RIFF_HEADER_SIZE = 12;
const FMT_CHUNK_HEADER_SIZE = 8;
const FMT_PCM_FIELDS_SIZE = 16;
const PCM_FORMAT_CODE = 1;

/**
 * Parsed WAV metadata.
 *
 * @typedef {Object} WavInfo
 * @property {number} sampleRate - Samples per second (e.g. 16000).
 * @property {number} channels - Channel count (mono = 1).
 * @property {number} bitsPerSample - Bits per sample (16 for PCM s16le).
 * @property {number} byteRate - Bytes per second (`sampleRate * channels * bitsPerSample / 8`).
 * @property {number} blockAlign - Bytes per sample frame.
 * @property {number} dataOffset - Byte offset of the `data` chunk payload.
 * @property {number} dataLength - Payload byte length of the `data` chunk.
 * @property {number} durationSec - Total audio duration in seconds.
 */

/**
 * Validates a WAV buffer and parses its `fmt ` + `data` chunks
 * (little-endian RIFF layout). Throws `TypeError` for anything that is not
 * a PCM WAV.
 *
 * @param {Buffer} buffer - The WAV bytes.
 * @returns {WavInfo} The parsed metadata.
 */
export function parseWav(buffer) {
  if (!buffer || buffer.length < RIFF_HEADER_SIZE || buffer.toString('ascii', 0, 4) !== 'RIFF') {
    throw new TypeError('Not a RIFF WAV file');
  }
  if (buffer.toString('ascii', 8, 12) !== 'WAVE') {
    throw new TypeError('Not a WAVE file');
  }
  let offset = RIFF_HEADER_SIZE;
  let format = null;
  let dataOffset = -1;
  let dataLength = -1;
  while (offset + CHUNK_ID_SIZE + CHUNK_SIZE_FIELD_SIZE <= buffer.length) {
    const chunkId = buffer.toString('ascii', offset, offset + CHUNK_ID_SIZE);
    const chunkSize = buffer.readUInt32LE(offset + CHUNK_ID_SIZE);
    const payloadOffset = offset + CHUNK_ID_SIZE + CHUNK_SIZE_FIELD_SIZE;
    if (chunkId === 'fmt ') {
      if (buffer.readUInt16LE(payloadOffset) !== PCM_FORMAT_CODE) {
        throw new TypeError('Not a PCM WAV file');
      }
      format = {
        channels: buffer.readUInt16LE(payloadOffset + 2),
        sampleRate: buffer.readUInt32LE(payloadOffset + 4),
        byteRate: buffer.readUInt32LE(payloadOffset + 8),
        blockAlign: buffer.readUInt16LE(payloadOffset + 12),
        bitsPerSample: buffer.readUInt16LE(payloadOffset + 14),
      };
    } else if (chunkId === 'data') {
      dataOffset = payloadOffset;
      // ffmpeg streams to a pipe with an unknown data size (0xFFFFFFFF
      // marker); the payload then runs to the end of the buffer.
      dataLength = chunkSize === 0xffffffff || chunkSize === 0 ? buffer.length - payloadOffset : chunkSize;
    }
    offset = payloadOffset + chunkSize + (chunkSize % 2);
  }
  if (!format) {
    throw new TypeError('Missing fmt chunk');
  }
  if (dataOffset < 0) {
    throw new TypeError('Missing data chunk');
  }
  const bytesPerFrame = format.blockAlign;
  const durationSec = format.byteRate > 0 ? dataLength / format.byteRate : 0;
  return { ...format, dataOffset, dataLength, durationSec };
}

/**
 * Builds a complete standalone WAV buffer from a PCM payload slice using
 * the source file's format parameters (single-pass conversion guarantee:
 * chunk re-encoding never happens, `## Audio Recording STT` §8, REQ-144).
 *
 * @param {Buffer} pcm - The PCM data bytes.
 * @param {WavInfo} info - The source WAV format.
 * @returns {Buffer} A complete WAV file.
 */
function buildWavBuffer(pcm, info) {
  const fmtChunkSize = FMT_CHUNK_HEADER_SIZE + FMT_PCM_FIELDS_SIZE;
  const totalSize = RIFF_HEADER_SIZE + fmtChunkSize + CHUNK_ID_SIZE + CHUNK_SIZE_FIELD_SIZE + pcm.length;
  const wav = Buffer.alloc(totalSize);
  wav.write('RIFF', 0, 'ascii');
  wav.writeUInt32LE(totalSize - 8, 4);
  wav.write('WAVE', 8, 'ascii');
  let offset = RIFF_HEADER_SIZE;
  wav.write('fmt ', offset, 'ascii');
  offset += CHUNK_ID_SIZE;
  wav.writeUInt32LE(FMT_PCM_FIELDS_SIZE, offset);
  offset += CHUNK_SIZE_FIELD_SIZE;
  wav.writeUInt16LE(PCM_FORMAT_CODE, offset);
  offset += 2;
  wav.writeUInt16LE(info.channels, offset);
  offset += 2;
  wav.writeUInt32LE(info.sampleRate, offset);
  offset += 4;
  wav.writeUInt32LE(info.byteRate, offset);
  offset += 4;
  wav.writeUInt16LE(info.blockAlign, offset);
  offset += 2;
  wav.writeUInt16LE(info.bitsPerSample, offset);
  offset += 2;
  wav.write('data', offset, 'ascii');
  offset += CHUNK_ID_SIZE;
  wav.writeUInt32LE(pcm.length, offset);
  offset += CHUNK_SIZE_FIELD_SIZE;
  pcm.copy(wav, offset);
  return wav;
}

/**
 * Splits a WAV buffer in-memory at the PCM level into complete WAV chunks
 * of at most `chunkDurationSec` seconds each (`## Audio Recording STT` §8;
 * T-4-02a). Boundaries are aligned to whole sample frames
 * (`blockAlign`), so every chunk's PCM payload is a byte-for-byte slice of
 * the source data chunk — concatenating all chunk payloads reproduces the
 * original PCM exactly (S-4-02a). The default chunk duration is the frozen
 * `ADDIS_AI_STT_MAX_DURATION_SEC` = 60.
 *
 * @param {Buffer} wavBuffer - The full WAV file (single-pass ffmpeg output).
 * @param {Object} [options] - Split options.
 * @param {number} [options.chunkDurationSec] - Max chunk duration in seconds.
 * @returns {Buffer[]} Complete standalone WAV chunk buffers.
 */
export function splitWavChunks(wavBuffer, { chunkDurationSec = constants.ADDIS_AI_STT_MAX_DURATION_SEC } = {}) {
  const info = parseWav(wavBuffer);
  if (info.blockAlign <= 0) {
    throw new TypeError('Invalid block alignment');
  }
  const rawChunkBytes = chunkDurationSec * info.byteRate;
  const chunkBytes = rawChunkBytes - (rawChunkBytes % info.blockAlign);
  const end = info.dataOffset + info.dataLength;
  const chunks = [];
  for (let offset = info.dataOffset; offset < end; offset += chunkBytes) {
    const pcm = wavBuffer.subarray(offset, Math.min(offset + chunkBytes, end));
    chunks.push(buildWavBuffer(pcm, info));
  }
  return chunks;
}

/**
 * Extracts the raw PCM payload of a WAV buffer — the reference surface for
 * byte-for-byte reassembly tests (S-4-02a).
 *
 * @param {Buffer} wavBuffer - The WAV bytes.
 * @returns {Buffer} The exact `data` chunk payload.
 */
export function getPcmData(wavBuffer) {
  const info = parseWav(wavBuffer);
  return wavBuffer.subarray(info.dataOffset, info.dataOffset + info.dataLength);
}
