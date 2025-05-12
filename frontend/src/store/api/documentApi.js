import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DOCUMENT_API = `${import.meta.env.VITE_BACKEND_URL}/api/document/`;

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: DOCUMENT_API,
    credentials: "include",
  }),
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    createDocument: builder.mutation({
      query: ({ title, content, teamId }) => ({
        url: "create",
        method: "POST",
        body: { title, content, teamId },
      }),
      invalidatesTags: ["Document"],
    }),

    updateDocument: builder.mutation({
      query: ({ id, title, content }) => ({
        url: `update/${id}`,
        method: "POST",
        body: { title, content },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Document", id }],
    }),

    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"],
    }),

    getDocumentById: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Document", id }],
    }),

    getAllDocumentsForTeam: builder.query({
      query: (teamId) => `team/${teamId}`,
      providesTags: ["Document"],
    }),

    getAllDocuments: builder.query({
      query: () => `explore`,
      providesTags: ["Document"],
    }),
  }),
});

export const {
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentByIdQuery,
  useGetAllDocumentsForTeamQuery,
  useGetAllDocumentsQuery,
} = documentApi;
