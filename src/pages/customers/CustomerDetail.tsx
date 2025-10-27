import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { customersApi } from '../../services/api';
import { Customer, Vehicle } from '../../types';

const CustomerDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await customersApi.getCustomerById(parseInt(id, 10));
        setCustomer(data);
      } catch (err: any) {
        console.error('Error fetching customer:', err);
        setError(err.response?.data?.message || t('errors.serverError'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomer();
  }, [id, t]);
  
  // Fetch customer vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      if (!id) return;
      
      setVehiclesLoading(true);
      
      try {
        const data = await customersApi.getCustomerVehicles(parseInt(id, 10));
        setVehicles(data);
      } catch (err: any) {
        console.error('Error fetching vehicles:', err);
        // We don't set error state here to avoid overriding the main error
      } finally {
        setVehiclesLoading(false);
      }
    };
    
    if (!loading && customer) {
      fetchVehicles();
    }
  }, [id, customer, loading]);
  
  const handleBack = () => {
    navigate('/customers');
  };
  
  const handleEdit = () => {
    if (id) {
      navigate(`/customers/${id}/edit`);
    }
  };
  
  const handleAddVehicle = () => {
    // Will implement in the next phase
    // For now, just navigate to the vehicles page
    navigate('/vehicles/new', { state: { customerId: parseInt(id!, 10) } });
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (error || !customer) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || t('customers.notFound')}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          {t('common.back')}
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            {t('common.back')}
          </Button>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            {t('customers.customerDetails')}
          </Typography>
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
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('customers.personalInfo')}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('customers.name')}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    {customer.name}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('customers.phone')}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    {customer.phone}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('customers.email')}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    {customer.email || '-'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('customers.address')}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    {customer.address || '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={t('customers.vehicles')}
                action={
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddVehicle}
                  >
                    {t('vehicles.newVehicle')}
                  </Button>
                }
              />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                {vehiclesLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : vehicles.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <DirectionsCarIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography color="text.secondary">
                      {t('customers.noVehicles')}
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {vehicles.map((vehicle, index) => (
                      <React.Fragment key={vehicle.id}>
                        <ListItem>
                          <ListItemText
                            primary={<Typography fontWeight="medium">{vehicle.make} {vehicle.model}</Typography>}
                            secondary={
                              <>
                                <Typography variant="body2" component="span">
                                  {vehicle.licensePlate} • {vehicle.year}
                                </Typography>
                                {vehicle.color && (
                                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    • {vehicle.color}
                                  </Typography>
                                )}
                              </>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton 
                              component={Link} 
                              to={`/vehicles/${vehicle.id}`}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < vehicles.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* We'll add repair history in the next phase */}
      </Box>
    </Container>
  );
};

export default CustomerDetail;
