import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/feedback`,
    credentials: "include",
  }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    submitFeedback: builder.mutation({
      query: (data) => ({
        url: "/submit",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Feedback"],
    }),
    getAllFeedback: builder.query({
      query: () => "/all",
      providesTags: ["Feedback"],
    }),
  }),
});

export const { useSubmitFeedbackMutation, useGetAllFeedbackQuery } =
  feedbackApi;
