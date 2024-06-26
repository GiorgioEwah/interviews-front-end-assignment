import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

const WelcomePage = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to RecipeBook
        </Typography>
        <Typography variant="h5" gutterBottom>
          Discover Recipes
        </Typography>
        <Link to="/recipes" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" sx={{ borderRadius: '20px', marginTop: '20px' }}>
            Explore
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default WelcomePage;