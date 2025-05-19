import { api } from "./api";

const basePath = "reservations";

const reservations = api.injectEndpoints({
  endpoints: (build) => ({
    createReservation: build.mutation({
      query: (body) => ({
        url: basePath,
        method: "POST",
        body,
      }),
    }),
    getReservationsByService: build.query({
      query: (serviceId) => `${basePath}/by-service/${serviceId}`,
    }),
    getReservationsByUser: build.query({
      query: (userId) => `users/${userId}/${basePath}`,
    }),
    ReservationDelete: build.mutation({
      query: (reservationId) => ({
        url: `${basePath}/${reservationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetReservationsByServiceQuery,
  useGetReservationsByUserQuery,
  useReservationDeleteMutation,
} = reservations;
