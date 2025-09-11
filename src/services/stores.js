import { api } from "./api";

const basePath = "stores";

const stores = api.injectEndpoints({
  endpoints: (build) => ({
    createStore: build.mutation({
      query: (body) => ({
        url: `admin/${basePath}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateStoreMutation } = stores;