import { api } from "./api";

const basePath = "dashboard";

const dashboardSuperAdmin = api.injectEndpoints({
  endpoints: (build) => ({
    getDashboardSuperAdmin: build.query({
      query: () => ({
        url: `super-admin/${basePath}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardSuperAdminQuery } = dashboardSuperAdmin;
