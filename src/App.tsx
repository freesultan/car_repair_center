import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, CssBaseline, Button, Container, Box, Typography, Paper } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { lightTheme, cacheRtl, cacheLtr } from './theme';
import './styles/fonts.css';

function App() {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fa' ? 'en' : 'fa');
  };

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {t('app.title')}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {t('app.welcome')}
            </Typography>
          </Box>
          
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                onClick={() => setCount((count) => count + 1)}
                sx={{ mb: 2 }}
              >
                {count === 0 ? t('common.create') : `${t('common.create')} ${count}`}
              </Button>
              
              <Typography variant="body1" sx={{ my: 2 }}>
                {t('repairs.description')}
              </Typography>
            </Box>
            
            <Button 
              variant="outlined"
              onClick={toggleLanguage}
            >
              {i18n.language === 'fa' ? 'English' : 'فارسی'}
            </Button>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
