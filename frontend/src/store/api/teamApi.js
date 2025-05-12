// store/api/teamApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TEAM_API = `${import.meta.env.VITE_BACKEND_URL}/api/team/`;

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TEAM_API,
    credentials: "include",
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // POST /team/create
    createTeam: builder.mutation({
      query: (name) => ({
        url: "create",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Team"],
    }),

    // GET /team/my-teams
    getMyTeams: builder.query({
      query: () => "my-teams",
      providesTags: ["Team"],
    }),

    // GET /team/:id
    getTeamById: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Team", id }],
    }),

    // POST /team/add-member
    addMemberToTeam: builder.mutation({
      query: ({ teamName, userNameToAdd }) => ({
        url: "add-member",
        method: "POST",
        body: { teamName, userNameToAdd },
      }),
      invalidatesTags: (result, error, { teamName }) => [{ type: "Team" }],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetMyTeamsQuery,
  useGetTeamByIdQuery,
  useAddMemberToTeamMutation,
} = teamApi;
