// store/api/suggestionApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const suggestionApi = createApi({
  reducerPath: "suggestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/suggestion/",
    credentials: "include",
  }),
  tagTypes: ["Suggestion"],
  endpoints: (builder) => ({
    addSuggestion: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Suggestion"],
    }),
    getSuggestionsByDocument: builder.query({
      query: (documentId) => `all/${documentId}`,
      providesTags: ["Suggestion"],
    }),
    deleteSuggestion: builder.mutation({
      query: (suggestionId) => ({
        url: `delete/${suggestionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suggestion"],
    }),
  }),
});

export const {
  useAddSuggestionMutation,
  useGetSuggestionsByDocumentQuery,
  useDeleteSuggestionMutation,
} = suggestionApi;
