import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCuisinesQuery, useGetDifficultiesQuery, useGetDietsQuery, useAddRecipeMutation } from '../services/recipes';
import { Container, Typography, TextField, Button, MenuItem, Box } from '@mui/material';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const { data: cuisines } = useGetCuisinesQuery();
  const { data: difficulties } = useGetDifficultiesQuery();
  const { data: diets } = useGetDietsQuery();
  const [addRecipe] = useAddRecipeMutation();

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cuisineId: '',
    dietId: '',
    difficultyId: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = new FormData();
    Object.keys(formData).forEach((key) => {
      recipeData.append(key, formData[key]);
    });
    await addRecipe(recipeData);
    navigate('/search');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ marginTop: '20px' }}>
        Add a New Recipe
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          fullWidth
          label="Recipe Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ marginTop: '10px', borderRadius: '20px' }}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Ingredients (comma separated)"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          sx={{ marginTop: '10px', borderRadius: '20px' }}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ marginTop: '10px', borderRadius: '20px' }}
          variant="outlined"
        />
        <TextField
          fullWidth
          select
          label="Cuisine"
          name="cuisineId"
          value={formData.cuisineId}
          onChange={handleChange}
          sx={{ marginTop: '10px', borderRadius: '20px' }}
          variant="outlined"
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
          label="Diet"
          name="dietId"
          value={formData.dietId}
          onChange={handleChange}
          sx={{ marginTop: '10px', borderRadius: '20px' }}
          variant="outlined"
        >
          {diets && diets.map((diet) => (
            <MenuItem key={diet.id} value={diet.id}>
              {diet.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          label="Difficulty"
          name="difficultyId"
          value={formData.difficultyId}
          onChange={handleChange}
          sx={{ marginTop: '10px', borderRadius: '20px' }}
          variant="outlined"
        >
          {difficulties && difficulties.map((difficulty) => (
            <MenuItem key={difficulty.id} value={difficulty.id}>
              {difficulty.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          component="label"
          sx={{ marginTop: '10px', borderRadius: '20px' }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', borderRadius: '20px' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddRecipePage;
