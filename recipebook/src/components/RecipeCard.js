import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, averageRating = 0 }) => {
  if (!recipe) return null; // Handle undefined recipe

  return (
    <Card sx={{ borderRadius: '20px' }}>
      <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="140"
          image={`${process.env.REACT_APP_API_BASE_URL}${recipe.image}`}
          alt={recipe.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {recipe.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <Rating value={averageRating} readOnly />
            <Typography variant="body2" color="text.secondary" component="div" sx={{ marginLeft: '5px' }}>
              {averageRating ? `${averageRating.toFixed(1)} stars` : 'No ratings'}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RecipeCard;
