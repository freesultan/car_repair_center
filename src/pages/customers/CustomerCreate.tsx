import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container, Snackbar, Alert, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomerForm from '../../components/forms/customer/CustomerForm';
import { Customer } from '../../types';

const CustomerCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = async (data: Customer) => {
    setLoading(true);
    setError(null);
    
    try {
      // The actual API call is handled in the form component
      setShowSuccess(true);
      
      // Navigate after 1 second to show success message
      setTimeout(() => {
        navigate('/customers');
      }, 1000);
    } catch (err: any) {
      setError(err.message || t('errors.serverError'));
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate('/customers');
  };
  
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            {t('common.back')}
          </Button>
          <Typography variant="h4" component="h1">
            {t('customers.newCustomer')}
          </Typography>
        </Box>
        
        <CustomerForm 
          onSubmit={handleSubmit} 
          loading={loading}
          error={error}
        />
        
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            {t('customers.createSuccess')}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default CustomerCreate;
