import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  TextField,
  Button,
} from '@mui/material';
import { vehiclesApi } from '../../../services/api';
import { Vehicle } from '../../../types';

interface VehicleFormProps {
  onSubmit: (vehicle: Vehicle) => void;
  initialData?: Vehicle;
  customerId?: number;
  loading?: boolean;
  error?: string | null;
  onCancel?: () => void;
}

export interface VehicleFormData {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color?: string;
  customerId?: number;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  onSubmit,
  initialData,
  customerId,
  loading = false,
  error = null,
  onCancel,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<VehicleFormData>({
    make: initialData?.make || '',
    model: initialData?.model || '',
    year: initialData?.year || 1400,
    licensePlate: initialData?.licensePlate || '',
    vin: initialData?.vin || '',
    color: initialData?.color || '',
    customerId: initialData?.customerId || customerId,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(error);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        make: initialData.make,
        model: initialData.model,
        year: initialData.year,
        licensePlate: initialData.licensePlate,
        vin: initialData.vin || '',
        color: initialData.color || '',
        customerId: initialData.customerId,
      });
    }
  }, [initialData]);

  useEffect(() => {
    setApiError(error);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' ? Number(value) : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.make.trim()) {
      newErrors.make = t('vehicles.validation.makeRequired');
    }
    if (!formData.model.trim()) {
      newErrors.model = t('vehicles.validation.modelRequired');
    }
    if (!formData.year || formData.year < 1300 || formData.year > 2050) {
      newErrors.year = t('vehicles.validation.yearRange');
    }
    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = t('vehicles.validation.licensePlateRequired');
    }
    if (!formData.customerId || typeof formData.customerId !== 'number') {
      newErrors.customerId = t('vehicles.validation.customerIdRequired');
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setApiLoading(true);
    setApiError(null);

    try {
      const vehicle = await vehiclesApi.createVehicle(formData as any);
      onSubmit(vehicle);
    } catch (err: any) {
      setApiError(
        err?.response?.data?.message ||
        (err?.response?.data?.errors && Array.isArray(err.response.data.errors)
          ? err.response.data.errors.map((e: any) => e.msg).join(', ')
          : t('common.errorOccurred'))
      );
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {initialData ? t('vehicles.editVehicle') : t('vehicles.newVehicle')}
      </Typography>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="make"
              label={t('vehicles.make')}
              value={formData.make}
              onChange={handleChange}
              error={!!validationErrors.make}
              helperText={validationErrors.make}
              required
              disabled={apiLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="model"
              label={t('vehicles.model')}
              value={formData.model}
              onChange={handleChange}
              error={!!validationErrors.model}
              helperText={validationErrors.model}
              required
              disabled={apiLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="year"
              label={t('vehicles.year')}
              type="number"
              value={formData.year}
              onChange={handleChange}
              error={!!validationErrors.year}
              helperText={validationErrors.year}
              required
              disabled={apiLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="licensePlate"
              label={t('vehicles.licensePlate')}
              value={formData.licensePlate}
              onChange={handleChange}
              error={!!validationErrors.licensePlate}
              helperText={validationErrors.licensePlate}
              required
              disabled={apiLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="vin"
              label={t('vehicles.vin')}
              value={formData.vin}
              onChange={handleChange}
              error={!!validationErrors.vin}
              helperText={validationErrors.vin}
              disabled={apiLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="color"
              label={t('vehicles.color')}
              value={formData.color}
              onChange={handleChange}
              error={!!validationErrors.color}
              helperText={validationErrors.color}
              disabled={apiLoading}
            />
          </Grid>
          <Grid item xs={12}>
            {validationErrors.customerId && (
              <Alert severity="warning">{validationErrors.customerId}</Alert>
            )}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              {onCancel && (
                <Button onClick={onCancel} disabled={apiLoading}>
                  {t('common.cancel')}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={apiLoading}
                startIcon={apiLoading ? <CircularProgress size={20} /> : null}
              >
                {initialData ? t('common.save') : t('common.create')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default VehicleForm;