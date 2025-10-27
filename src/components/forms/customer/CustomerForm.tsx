import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography, Grid, Alert, CircularProgress } from '@mui/material';
import { FormTextField, FormPhoneInput } from '../FormFields';
import FormSubmitButton from '../FormSubmitButton';
import { Customer } from '../../../types';
import { customersApi } from '../../../services/api';

interface CustomerFormProps {
  onSubmit: (data: Customer) => void;
  initialData?: Customer;
  loading?: boolean;
  error?: string | null;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  initialData,
  loading = false,
  error = null,
}) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(error);
  
  // Update form if initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        phone: initialData.phone,
        email: initialData.email || '',
        address: initialData.address || '',
      });
    }
  }, [initialData]);
  
  // Update API error if prop changes
  useEffect(() => {
    setApiError(error);
  }, [error]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear API error when any field is edited
    if (apiError) {
      setApiError(null);
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = t('validation.required');
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('validation.required');
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = t('validation.invalidPhone');
    }
    
    // Email validation (if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      let result: Customer;
      
      if (initialData?.id) {
        // Update existing customer
        result = await customersApi.updateCustomer(initialData.id, formData);
      } else {
        // Create new customer
        result = await customersApi.createCustomer(formData);
      }
      
      onSubmit(result);
    } catch (error: any) {
      setApiError(error.response?.data?.message || t('errors.serverError'));
    }
  };
  
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {initialData ? t('customers.editCustomer') : t('customers.newCustomer')}
      </Typography>
      
      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormTextField
              name="name"
              label={t('customers.name')}
              value={formData.name}
              onChange={handleChange}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              required
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormPhoneInput
              name="phone"
              label={t('customers.phone')}
              value={formData.phone}
              onChange={handleChange}
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
              required
              placeholder="09123456789"
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormTextField
              name="email"
              label={t('customers.email')}
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              type="email"
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormTextField
              name="address"
              label={t('customers.address')}
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormSubmitButton
              label={initialData ? 'common.save' : 'common.create'}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CustomerForm;
