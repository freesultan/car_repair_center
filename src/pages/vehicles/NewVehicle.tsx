import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import VehicleForm, { VehicleFormData } from '../../components/forms/vehicle/VehicleForm';
import { vehiclesApi } from '../../services/api';

const NewVehicle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Get customerId from location state if coming from customer detail page
  const customerId = location.state?.customerId;

  const handleSubmit = async (data: VehicleFormData) => {
    try {
      setLoading(true);
      setError(null);
      await vehiclesApi.createVehicle(data);
      
      // Redirect to vehicles list or back to customer detail
      if (customerId) {
        navigate(`/customers/${customerId}`);
      } else {
        navigate('/vehicles');
      }
    } catch (err: any) {
      console.error('Error creating vehicle:', err);
      setError(err.response?.data?.message || t('common.errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (customerId) {
      navigate(`/customers/${customerId}`);
    } else {
      navigate('/vehicles');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('vehicles.newVehicle')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <VehicleForm
          customerId={customerId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </Paper>
    </Box>
  );
};

export default NewVehicle;