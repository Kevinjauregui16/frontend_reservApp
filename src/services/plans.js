import { api } from "./api";

const basePath = "plans";

const plans = api.injectEndpoints({
  endpoints: (build) => ({
    listplans: build.query({
      query: () => ({
        url: `super-admin/${basePath}`,
        method: "GET",
      }),
    }),
    createPlan: build.mutation({
      query: (body) => ({
        url: `super-admin/${basePath}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useListplansQuery, useCreatePlanMutation } = plans;
