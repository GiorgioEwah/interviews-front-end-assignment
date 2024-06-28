import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import WelcomePage from './components/WelcomePage';
import RecipeSearchPage from './components/RecipeSearchPage';
import RecipeDetailPage from './components/RecipeDetailPage';
import AddRecipePage from './components/AddRecipePage';
import Navbar from './components/Navbar';

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
    borderRadius: 27,
  },
});

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/recipes" element={<RecipeSearchPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/add" element={<AddRecipePage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppContent />
    </ThemeProvider>
  );
}

export default App;
