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
    getSuggestionsByUser: builder.query({
      query: () => "/user-suggestion",
      providesTags: ["Suggestion"],
    }),
    updateSuggestionStatus: builder.mutation({
      query: ({ suggestionId, status }) => ({
        url: `status/${suggestionId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Suggestion"],
    }),
    getAllSuggestions: builder.query({
      query: () => "all",
      providesTags: ["Suggestion"],
    }),
  }),
});

export const {
  useAddSuggestionMutation,
  useGetSuggestionsByDocumentQuery,
  useDeleteSuggestionMutation,
  useGetSuggestionsByUserQuery,
  useUpdateSuggestionStatusMutation,
  useGetAllSuggestionsQuery,
} = suggestionApi;
