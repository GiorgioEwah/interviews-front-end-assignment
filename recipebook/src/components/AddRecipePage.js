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

  const [errors, setErrors] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cuisineId: '',
    dietId: '',
    difficultyId: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
    setErrors({
      ...errors,
      image: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {
      name: '',
      ingredients: '',
      instructions: '',
      cuisineId: '',
      dietId: '',
      difficultyId: '',
      image: '',
    };

    if (!formData.name) {
      newErrors.name = 'Recipe Name is required';
      valid = false;
    }
    if (!formData.ingredients) {
      newErrors.ingredients = 'Ingredients are required';
      valid = false;
    }
    if (!formData.instructions) {
      newErrors.instructions = 'Instructions are required';
      valid = false;
    }
    if (!formData.cuisineId) {
      newErrors.cuisineId = 'Cuisine is required';
      valid = false;
    }
    if (!formData.dietId) {
      newErrors.dietId = 'Diet is required';
      valid = false;
    }
    if (!formData.difficultyId) {
      newErrors.difficultyId = 'Difficulty is required';
      valid = false;
    }
    if (!formData.image) {
      newErrors.image = 'Image is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const recipeData = new FormData();
      Object.keys(formData).forEach((key) => {
        recipeData.append(key, formData[key]);
      });
      await addRecipe(recipeData);
      navigate('/recipes');
    }
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
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Ingredients (comma separated)"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          sx={{ marginTop: '10px', borderRadius: '20px' }}
          variant="outlined"
          required
          error={!!errors.ingredients}
          helperText={errors.ingredients}
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
          required
          error={!!errors.instructions}
          helperText={errors.instructions}
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
          required
          error={!!errors.cuisineId}
          helperText={errors.cuisineId}
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
          required
          error={!!errors.dietId}
          helperText={errors.dietId}
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
          required
          error={!!errors.difficultyId}
          helperText={errors.difficultyId}
        >
          {difficulties && difficulties.map((difficulty) => (
            <MenuItem key={difficulty.id} value={difficulty.id}>
              {difficulty.name}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Button
            variant="contained"
            component="label"
            sx={{ borderRadius: '20px', marginRight: '10px' }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
              required
            />
          </Button>
          {errors.image && <Typography color="error">{errors.image}</Typography>}
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: '20px' }}
        >
          Submit
        </Button>
        </Box>  
      </form>
    </Container>
  );
};

export default AddRecipePage;
