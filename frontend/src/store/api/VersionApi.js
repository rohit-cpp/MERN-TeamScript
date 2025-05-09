import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const versionApi = createApi({
  reducerPath: "versionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/version/",
    credentials: "include",
  }),
  tagTypes: ["Version"],
  endpoints: (builder) => ({
    createVersion: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Version"],
    }),
    getVersionsByDocument: builder.query({
      query: (documentId) => `all/${documentId}`,
      providesTags: ["Version"],
    }),
    getVersionById: builder.query({
      query: (versionId) => `single/${versionId}`,
      providesTags: ["Version"],
    }),
    updateVersion: builder.mutation({
      query: ({ versionId, content }) => ({
        url: `update/${versionId}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Version"],
    }),
    deleteVersion: builder.mutation({
      query: (versionId) => ({
        url: `delete/${versionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Version"],
    }),
  }),
});

export const {
  useCreateVersionMutation,
  useGetVersionsByDocumentQuery,
  useGetVersionByIdQuery,
  useUpdateVersionMutation,
  useDeleteVersionMutation,
} = versionApi;
