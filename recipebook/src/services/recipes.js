import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => '/recipes',
    }),
    getRecipeById: builder.query({
      query: (id) => `/recipes/${id}`,
    }),
    getCommentsByRecipeId: builder.query({
      query: (recipeId) => `/comments?recipeId=${recipeId}`,
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: '/comments',
        method: 'POST',
        body: comment,
      }),
    }),
    getCuisines: builder.query({
      query: () => '/cuisines',
    }),
    getDifficulties: builder.query({
      query: () => '/difficulties',
    }),
    getDiets: builder.query({
      query: () => '/diets',
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetCommentsByRecipeIdQuery,
  useAddCommentMutation,
  useGetCuisinesQuery,
  useGetDifficultiesQuery,
  useGetDietsQuery,
} = recipesApi;
