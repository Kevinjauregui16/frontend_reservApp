import { api } from "./api";

const basePath = "users";

const users = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => basePath,
    }),
    getUserId: build.query({
      query: (clerkId) => `${basePath}/getIdByClerkId?clerk_id=${clerkId}`,
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: basePath,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserIdQuery, useRegisterUserMutation } =
  users;
