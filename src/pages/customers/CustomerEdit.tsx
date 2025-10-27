import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container, Snackbar, Alert, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomerForm from '../../components/forms/customer/CustomerForm';
import { Customer } from '../../types';
import { customersApi } from '../../services/api';

const CustomerEdit: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
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
  
  const handleSubmit = async (data: Customer) => {
    if (!id) return;
    
    setSaving(true);
    setError(null);
    
    try {
      // The actual API call is handled in the form component
      setShowSuccess(true);
      
      // Navigate after 1 second to show success message
      setTimeout(() => {
        navigate(`/customers/${id}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || t('errors.serverError'));
      setSaving(false);
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (!customer && !loading) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {t('customers.notFound')}
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
            {t('customers.editCustomer')}
          </Typography>
        </Box>
        
        {customer && (
          <CustomerForm 
            onSubmit={handleSubmit} 
            initialData={customer}
            loading={saving}
            error={error}
          />
        )}
        
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            {t('customers.updateSuccess')}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default CustomerEdit;
