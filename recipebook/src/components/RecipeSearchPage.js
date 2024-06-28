import React, { useState, useEffect } from 'react';
import { useGetRecipesQuery, useGetCuisinesQuery, useGetDifficultiesQuery, useGetDietsQuery } from '../services/recipes';
import { Container, Grid, TextField, Button, MenuItem, CircularProgress, Box } from '@mui/material';
import RecipeCard from './RecipeCard';

const RecipeSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState('');
  const [averageRatings, setAverageRatings] = useState({});

  const { data: recipes, isLoading: recipesLoading } = useGetRecipesQuery();
  const { data: cuisines, isLoading: cuisinesLoading } = useGetCuisinesQuery();
  const { data: difficulties, isLoading: difficultiesLoading } = useGetDifficultiesQuery();
  const { data: diets, isLoading: dietsLoading } = useGetDietsQuery();

  useEffect(() => {
    if (recipes) {
      const fetchRatings = async () => {
        const ratings = {};
        for (const recipe of recipes) {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments?recipeId=${recipe.id}`);
          const comments = await response.json();
          const averageRating = comments.length
            ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
            : 0;
          ratings[recipe.id] = averageRating;
        }
        setAverageRatings(ratings);
      };
      fetchRatings();
    }
  }, [recipes]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCuisine('');
    setSelectedDifficulty([]);
    setSelectedDiet('');
  };

  if (recipesLoading || cuisinesLoading || difficultiesLoading || dietsLoading) return <CircularProgress />;

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      (!searchTerm || recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCuisine || recipe.cuisineId === selectedCuisine) &&
      (selectedDifficulty.length === 0 || selectedDifficulty.includes(recipe.difficultyId)) &&
      (!selectedDiet || recipe.dietId === selectedDiet)
    );
  });

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginBottom: '10px', borderRadius: '20px' }}
            />
            <TextField
              fullWidth
              select
              label="Cuisine"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              sx={{ marginBottom: '10px', borderRadius: '20px' }}
            >
              {cuisines && cuisines.map((cuisine) => (
                <MenuItem key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              multiple
              sx={{ marginBottom: '10px', borderRadius: '20px' }}
            >
              {difficulties && difficulties.map((difficulty) => (
                <MenuItem key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Diet"
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              sx={{ marginBottom: '10px', borderRadius: '20px' }}
            >
              {diets && diets.map((diet) => (
                <MenuItem key={diet.id} value={diet.id}>
                  {diet.name}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ borderRadius: '20px' }}>
                Reset
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={3}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} key={recipe.id}>
                <RecipeCard recipe={recipe} averageRating={averageRatings[recipe.id] || 0} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeSearchPage;
