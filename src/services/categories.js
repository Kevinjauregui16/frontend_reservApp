import { api } from "./api";

const basePath = "categories";

const categories = api.injectEndpoints({
  endpoints: (build) => ({
    listCategories: build.query({
      query: () => ({
        url: `super-admin/${basePath}`,
        method: "GET",
      }),
    }),
    createCategory: build.mutation({
      query: (body) => ({
        url: `super-admin/${basePath}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useListCategoriesQuery, useCreateCategoryMutation } = categories;
