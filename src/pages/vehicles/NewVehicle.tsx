import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import VehicleForm from '../../components/forms/vehicle/VehicleForm';

const NewVehicle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  // Get customerId from location state if coming from customer detail page
  const customerId = location.state?.customerId;

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      if (customerId) {
        navigate(`/customers/${customerId}`);
      } else {
        navigate('/vehicles');
      }
    }, 1000);
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

      <Paper sx={{ p: 3 }}>
        <VehicleForm
          customerId={customerId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {t('vehicles.createSuccess')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewVehicle;