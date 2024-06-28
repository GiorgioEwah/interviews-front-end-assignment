import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RecipeBook
        </Typography>
        <Box>
          {location.pathname === '/recipes' ? (
            <Button
              component={Link}
              to="/add"
              variant="contained"
              color="secondary"
              sx={{ borderRadius: '20px' }}
            >
              Add Recipe
            </Button>
          ) : (
            <Button
              onClick={handleBackClick}
              variant="contained"
              color="secondary"
              sx={{ borderRadius: '20px' }}
            >
              Back
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
