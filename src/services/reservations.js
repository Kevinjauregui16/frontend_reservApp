import { api } from "./api";

const basePath = "reservations";

const reservations = api.injectEndpoints({
  endpoints: (build) => ({
    reserveService: build.mutation({
      query: (body) => ({
        url: basePath,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useReserveServiceMutation } = reservations;
