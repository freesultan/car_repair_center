import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { 
  FormTextField, 
  FormPhoneInput, 
  FormSubmitButton 
} from '..';

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  initialData?: CustomerFormData;
  loading?: boolean;
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
}) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {initialData ? t('customers.editCustomer') : t('customers.newCustomer')}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormTextField
              name="name"
              label="customers.name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormPhoneInput
              name="phone"
              label="customers.phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              placeholder="09123456789"
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormTextField
              name="email"
              label="customers.email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              type="email"
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormTextField
              name="address"
              label="customers.address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
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
