import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Grid, Divider } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const RepairDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('repairs.repairDetails')}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="body1">
              {t('repairs.viewingRepair')}: {id}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {t('common.comingSoon')}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('repairs.actions')}
            </Typography>
            
            <Button
              component={Link}
              to={`/repairs/${id}/photos`}
              variant="outlined"
              fullWidth
              startIcon={<PhotoLibraryIcon />}
              sx={{ mt: 1 }}
            >
              {t('repairs.viewPhotos')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RepairDetail;
