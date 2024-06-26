import React, { useState } from 'react';
import {
  useGetRecipesQuery,
  useGetCuisinesQuery,
  useGetDifficultiesQuery,
  useGetDietsQuery,
} from '../services/recipes';
import {
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import RecipeCard from './RecipeCard';
import Navbar from './Navbar';

const RecipeSearchPage = () => {
  const { data: recipes, error, isLoading } = useGetRecipesQuery();
  const { data: cuisines } = useGetCuisinesQuery();
  const { data: difficulties } = useGetDifficultiesQuery();
  const { data: diets } = useGetDietsQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleDietChange = (e) => {
    setSelectedDiet(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCuisine('');
    setSelectedDifficulty('');
    setSelectedDiet('');
  };

  const filteredRecipes = recipes?.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCuisine === '' || recipe.cuisineId === selectedCuisine) &&
      (selectedDifficulty === '' || recipe.difficultyId === selectedDifficulty) &&
      (selectedDiet === '' || recipe.dietId === selectedDiet)
    );
  });

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ position: 'sticky', top: '20px' }}>
              <Typography variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                Filters
              </Typography>
              <TextField
                label="Search"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                sx={{ borderRadius: '20px', marginBottom: '10px' }}
                variant="outlined"
              />
              <TextField
                select
                label="Cuisine"
                value={selectedCuisine}
                onChange={handleCuisineChange}
                fullWidth
                sx={{ borderRadius: '20px', marginBottom: '10px' }}
                variant="outlined"
              >
                <MenuItem value="">All Cuisines</MenuItem>
                {cuisines?.map((cuisine) => (
                  <MenuItem key={cuisine.id} value={cuisine.id}>
                    {cuisine.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Difficulty"
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
                fullWidth
                sx={{ borderRadius: '20px', marginBottom: '10px' }}
                variant="outlined"
              >
                <MenuItem value="">All Difficulties</MenuItem>
                {difficulties?.map((difficulty) => (
                  <MenuItem key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Diet"
                value={selectedDiet}
                onChange={handleDietChange}
                fullWidth
                sx={{ borderRadius: '20px', marginBottom: '10px' }}
                variant="outlined"
              >
                <MenuItem value="">All Diets</MenuItem>
                {diets?.map((diet) => (
                  <MenuItem key={diet.id} value={diet.id}>
                    {diet.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                onClick={handleReset}
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ borderRadius: '20px', marginTop: '10px' }}
              >
                Reset Filters
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h4" component="h1" sx={{ marginBottom: '20px' }}>
              Search Recipes
            </Typography>
            <Grid container spacing={3}>
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : error ? (
                <Typography>Error: {error.message}</Typography>
              ) : (
                filteredRecipes?.map((recipe) => (
                  <Grid item xs={12} key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default RecipeSearchPage;
