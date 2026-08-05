/**
 * @module redux/features/transcription
 */

import { api } from './api.js';

/**
 * Transcription domain endpoints injected into the shared API slice:
 * `updateTranscription` saves the review edit (`PATCH /transcriptions/:id`,
 * REQ-149; `## Transcription Review`). Success unwraps the §10.7 envelope
 * into the transcription doc; a save invalidates report queries because the
 * report document embeds its transcription.
 */
export const transcriptionApi = api.injectEndpoints({
  tagTypes: ['Report'],
  endpoints: (build) => ({
    updateTranscription: build.mutation({
      query: ({ id, ...body }) => ({ url: `/transcriptions/${id}`, method: 'PATCH', body }),
      transformResponse: (response) => response.data.transcription,
      invalidatesTags: ['Report'],
    }),
  }),
});

export const { useUpdateTranscriptionMutation } = transcriptionApi;
