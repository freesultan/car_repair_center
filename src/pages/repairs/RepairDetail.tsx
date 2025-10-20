import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const RepairDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('repairs.repairDetails')}
      </Typography>
      
      <Typography variant="body1">
        {t('repairs.viewingRepair')}: {id}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {t('common.comingSoon')}
      </Typography>
    </Box>
  );
};

export default RepairDetail;
