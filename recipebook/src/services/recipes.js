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
      query: (newComment) => ({
        url: '/comments',
        method: 'POST',
        body: newComment,
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
    addRecipe: builder.mutation({
      query: (newRecipe) => ({
        url: '/recipes',
        method: 'POST',
        body: newRecipe,
      }),
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
  useAddRecipeMutation,
} = recipesApi;