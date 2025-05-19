import { api } from "./api";

const basePath = "services";

const services = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query({
      query: () => basePath,
    }),
    getServicesSchedules: build.query({
      query: (id) => `${basePath}/${id}/schedules`,
    }),
    getServicesByFilter: build.query({
      query: (filter) => {
        const params = new URLSearchParams();
        if (filter.name) params.append("name", filter.name);
        if (filter.location) params.append("location", filter.location);
        return `${basePath}/filter?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServicesSchedulesQuery,
  useGetServicesByFilterQuery,
} = services;
