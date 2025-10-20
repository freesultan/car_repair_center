import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { store, useAppSelector } from './store';
import { lightTheme, darkTheme, cacheRtl, cacheLtr } from './theme';
import AppRoutes from './routes';
import './i18n';
import './styles/fonts.css';

// App wrapper with providers
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemedApp />
      </Router>
    </Provider>
  );
};

// Component with theme based on Redux store
const ThemedApp = () => {
  const { theme } = useAppSelector((state) => state.ui);
  const isRtl = theme.direction === 'rtl';
  const currentTheme = theme.mode === 'light' ? lightTheme : darkTheme;
  
  // Update document direction when language changes
  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'fa' : 'en';
  }, [isRtl]);

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={{...currentTheme, direction: theme.direction}}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppWrapper;
