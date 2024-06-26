import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import WelcomePage from './components/WelcomePage';
import RecipeSearchPage from './components/RecipeSearchPage';
import RecipeDetailPage from './components/RecipeDetailPage';
import AddRecipePage from './components/AddRecipePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#03a9f4',
    },
  },
  shape: {
    borderRadius: 20,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/recipes" element={<RecipeSearchPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/add" element={<AddRecipePage />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;