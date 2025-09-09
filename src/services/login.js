import { api } from "./api";

const basePath = "login";

const login = api.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: `${basePath}`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = login;
