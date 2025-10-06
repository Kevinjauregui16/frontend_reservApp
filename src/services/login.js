import { api } from "./api";

const basePath = "login";

const login = api.injectEndpoints({
  endpoints: (build) => ({
    logoutUser: build.mutation({
      query: () => ({
        url: `logout`,
        method: "POST",
      }),
    }),
    loginUser: build.mutation({
      query: (credentials) => ({
        url: `${basePath}`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = login;
