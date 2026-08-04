/**
 * @module redux/features/branch
 */

import { api } from './api.js';

/**
 * Branch domain endpoints injected into the shared API slice (REQ-103):
 * Branch CRUD (Phase 3 scope). Success responses unwrap the §10.7 envelope
 * via `transformResponse` into the shapes the UI consumes (REQ-106,
 * AD-016); errors surface through `error.data.message` and
 * `error.data.data.errors`.
 */
export const branchApi = api.injectEndpoints({
  tagTypes: ['Branch'],
  endpoints: (build) => ({
    listBranches: build.query({
      query: (params) => ({ url: '/branches', params }),
      transformResponse: (response) => response.data,
      providesTags: ['Branch'],
    }),
    getBranch: build.query({
      query: (id) => `/branches/${id}`,
      transformResponse: (response) => response.data.branch,
      providesTags: (_result, _error, id) => [{ type: 'Branch', id }],
    }),
    createBranch: build.mutation({
      query: (body) => ({ url: '/branches', method: 'POST', body }),
      transformResponse: (response) => response.data.branch,
      invalidatesTags: ['Branch'],
    }),
    updateBranch: build.mutation({
      query: ({ id, ...body }) => ({ url: `/branches/${id}`, method: 'PUT', body }),
      transformResponse: (response) => response.data.branch,
      invalidatesTags: (_result, _error, arg) => [{ type: 'Branch', id: arg.id }],
    }),
    deleteBranch: build.mutation({
      query: (id) => ({ url: `/branches/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Branch'],
    }),
  }),
});

export const {
  useListBranchesQuery,
  useLazyListBranchesQuery,
  useGetBranchQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
