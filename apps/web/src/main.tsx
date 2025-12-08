import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { GuestsProvider } from './contexts/GuestContext.tsx';

const theme = createTheme({
  palette: {
    background: {
      default: '#F9F5F2',
    },
    primary: {
      main: '#C4A484', // doradito arena
    },
    secondary: {
      main: '#E8C5C8', // rosita boda
    },
  },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'sans-serif'].join(','),
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <GuestsProvider>
          <App />
        </GuestsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
