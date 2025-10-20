import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CustomersList = () => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {t('customers.title')}
        </Typography>
        
        <Button
          component={Link}
          to="/customers/new"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          {t('customers.newCustomer')}
        </Button>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          {t('common.comingSoon')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t('customers.clickAddToCreate')}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CustomersList;
