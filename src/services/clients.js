import { api } from "./api";

const basePath = "clients";

const clients = api.injectEndpoints({
  endpoints: (build) => ({
    registerClient: build.mutation({
      query: (body) => ({
        url: `super-admin/${basePath}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterClientMutation } = clients;
