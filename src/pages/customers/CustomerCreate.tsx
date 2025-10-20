import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container, Paper } from '@mui/material';
import CustomerForm, { CustomerFormData } from '../../components/forms/customer/CustomerForm';

const CustomerCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    
    // Simulate API call
    console.log('Creating customer:', data);
    
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      console.log('Customer created successfully');
      
      // Redirect to customers list
      navigate('/customers');
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('customers.newCustomer')}
        </Typography>
        
        <CustomerForm onSubmit={handleSubmit} loading={loading} />
      </Box>
    </Container>
  );
};

export default CustomerCreate;
