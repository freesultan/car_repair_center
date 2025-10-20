import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
  const { t } = useTranslation();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t('errors.pageNotFound')}
      </Typography>
      <Button component={Link} to="/" variant="contained">
        {t('common.backToHome')}
      </Button>
    </Box>
  );
};

export default NotFound;
