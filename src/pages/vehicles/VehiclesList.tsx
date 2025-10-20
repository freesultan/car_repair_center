import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const VehiclesList = () => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('vehicles.title')}
      </Typography>
      
      <Typography variant="body1">
        {t('common.comingSoon')}
      </Typography>
    </Box>
  );
};

export default VehiclesList;
