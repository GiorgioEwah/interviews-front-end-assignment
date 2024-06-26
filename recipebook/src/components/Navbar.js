import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RecipeBook
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/add"
            variant="contained"
            color="secondary"
            sx={{ borderRadius: '20px' }}
          >
            Add Recipe
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
