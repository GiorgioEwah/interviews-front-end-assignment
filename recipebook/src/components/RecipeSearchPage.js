import React from 'react';
import { Grid, Container } from '@mui/material';
import { useGetRecipesQuery } from '../services/recipes';
import RecipeCard from './RecipeCard';

const RecipeSearchPage = () => {
  const { data: recipes, error, isLoading } = useGetRecipesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid item xs={12} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeSearchPage;
