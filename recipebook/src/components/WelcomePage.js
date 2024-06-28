import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../assets/welcome-image.png'; // Ensure this path matches where you saved the image
import logo from '../assets/recipebook-logo.png'; // Save the generated logo image as recipebook-logo.png in assets

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/recipes'); // Update the path if necessary
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box>
            <img src={welcomeImage} alt="Welcome to RecipeBook" style={{ width: '100%', borderRadius: '10px' }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Box>
            <img src={logo} alt="RecipeBook Logo" style={{ width: '150px', marginBottom: '20px', borderRadius: '99px'}} />
          </Box>
          <Typography variant="h2" component="h1" gutterBottom>
            RecipeBook
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Discover Recipes
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={handleExplore} sx={{ marginTop: '20px', marginBottom:'45px' }}>
            Explore
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;
