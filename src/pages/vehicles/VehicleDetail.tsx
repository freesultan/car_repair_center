import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Build as BuildIcon
} from '@mui/icons-material';
import { Vehicle } from '../../types';
import { vehiclesApi } from '../../services/api';

const VehicleDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // State
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicle details
  const fetchVehicle = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const vehicleData = await vehiclesApi.getVehicleById(parseInt(id, 10));
      setVehicle(vehicleData);
    } catch (err: any) {
      console.error('Error fetching vehicle:', err);
      setError(err.response?.data?.message || 'Failed to fetch vehicle details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  // Handlers
  const handleBack = () => {
    navigate('/vehicles');
  };

  const handleEdit = () => {
    if (id) {
      navigate(`/vehicles/${id}/edit`);
    }
  };

  const handleAddRepair = () => {
    if (id) {
      navigate('/repairs/new', { state: { vehicleId: parseInt(id, 10) } });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !vehicle) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          {t('common.back')}
        </Button>
        <Alert severity="error">
          {error || t('vehicles.vehicleNotFound')}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            {t('common.back')}
          </Button>
          <Typography variant="h4" component="h1">
            {vehicle.make} {vehicle.model}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          {t('common.edit')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Vehicle Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('vehicles.vehicleDetails')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {t('vehicles.make')}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.make}
                </Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {t('vehicles.model')}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.model}
                </Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {t('vehicles.year')}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.year}
                </Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {t('vehicles.licensePlate')}
                </Typography>
                <Chip 
                  label={vehicle.licensePlate} 
                  variant="outlined" 
                  sx={{ mt: 0.5 }}
                />
              </Grid>
              
              {vehicle.vin && (
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('vehicles.vin')}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {vehicle.vin}
                  </Typography>
                </Grid>
              )}
              
              {vehicle.color && (
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    {t('vehicles.color')}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {vehicle.color}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Customer Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('vehicles.customerInfo')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {vehicle.customer ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    {t('customers.name')}
                  </Typography>
                  <Link 
                    to={`/customers/${vehicle.customer.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography variant="body1" fontWeight="medium" color="primary" sx={{ cursor: 'pointer' }}>
                      {vehicle.customer.name}
                    </Typography>
                  </Link>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    {t('customers.phone')}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {vehicle.customer.phone}
                  </Typography>
                </Grid>
                
                {vehicle.customer.email && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      {t('customers.email')}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.customer.email}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            ) : (
              <Typography color="text.secondary">
                {t('vehicles.noCustomerInfo')}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Repair History */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={t('vehicles.repairHistory')}
              action={
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddRepair}
                >
                  {t('repairs.newRepair')}
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              {vehicle.repairs && vehicle.repairs.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {vehicle.repairs.map((repair, index) => (
                    <React.Fragment key={repair.id}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography fontWeight="medium">
                              {repair.description}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" component="span">
                                {new Date(repair.createdAt).toLocaleDateString()}
                              </Typography>
                              {repair.status && (
                                <Chip 
                                  label={t(`repairs.status.${repair.status.toLowerCase()}`)} 
                                  size="small" 
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            component={Link} 
                            to={`/repairs/${repair.id}`}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < vehicle.repairs.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <BuildIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography color="text.secondary">
                    {t('vehicles.noRepairs')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehicleDetail;