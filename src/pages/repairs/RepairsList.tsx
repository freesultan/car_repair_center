import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const RepairsList = () => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('repairs.title')}
      </Typography>
      
      <Typography variant="body1">
        {t('common.comingSoon')}
      </Typography>
    </Box>
  );
};

export default RepairsList;
