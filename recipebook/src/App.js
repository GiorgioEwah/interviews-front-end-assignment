import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import WelcomePage from './components/WelcomePage';
import RecipeSearchPage from './components/RecipeSearchPage';

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
        </Routes>
    </ThemeProvider>
  );
}

export default App;