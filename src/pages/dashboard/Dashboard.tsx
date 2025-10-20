import { useTranslation } from 'react-i18next';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Dashboard = () => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              {t('dashboard.activeRepairs')}
            </Typography>
            <Typography component="p" variant="h4">
              24
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              {t('dashboard.completedToday')}
            </Typography>
            <Typography component="p" variant="h4">
              7
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              {t('dashboard.pendingApprovals')}
            </Typography>
            <Typography component="p" variant="h4">
              12
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              {t('dashboard.totalCustomers')}
            </Typography>
            <Typography component="p" variant="h4">
              143
            </Typography>
          </Paper>
        </Grid>
        
        {/* Recent activities */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              {t('dashboard.recentActivities')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.comingSoon')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
