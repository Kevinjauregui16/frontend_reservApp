import { api } from "./api";

const basePath = "services";

const services = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query({
      query: () => basePath,
    }),
  }),
});

export const { useGetServicesQuery } = services;
