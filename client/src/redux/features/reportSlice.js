/**
 * @module redux/features/report
 */

import { api } from './api.js';

/**
 * Report domain endpoints injected into the shared API slice (REQ-103):
 * list/create/detail/update/delete for reports (Phase 3 scope). Success
 * responses unwrap the §10.7 envelope via `transformResponse` into the
 * shapes the UI consumes (REQ-106, AD-016); errors surface through
 * `error.data.message` and `error.data.data.errors`.
 */
export const reportApi = api.injectEndpoints({
  tagTypes: ['Report'],
  endpoints: (build) => ({
    listReports: build.query({
      query: (params) => ({ url: '/reports', params }),
      transformResponse: (response) => response.data,
      providesTags: ['Report'],
    }),
    getReport: build.query({
      query: (id) => `/reports/${id}`,
      transformResponse: (response) => response.data.report,
      providesTags: (_result, _error, id) => [{ type: 'Report', id }],
    }),
    createReport: build.mutation({
      query: (body) => ({ url: '/reports', method: 'POST', body }),
      transformResponse: (response) => response.data.report,
      invalidatesTags: ['Report'],
    }),
    updateReport: build.mutation({
      query: ({ id, ...body }) => ({ url: `/reports/${id}`, method: 'PUT', body }),
      transformResponse: (response) => response.data.report,
      invalidatesTags: (_result, _error, arg) => [{ type: 'Report', id: arg.id }],
    }),
    deleteReport: build.mutation({
      query: (id) => ({ url: `/reports/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Report'],
    }),
  }),
});

export const {
  useListReportsQuery,
  useLazyListReportsQuery,
  useGetReportQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = reportApi;
