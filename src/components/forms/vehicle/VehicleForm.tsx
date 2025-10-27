import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface VehicleFormProps {
  customerId?: number;
  onSubmit: (data: VehicleFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
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

const schema = yup.object({
  make: yup.string().required('vehicles.validation.makeRequired'),
  model: yup.string().required('vehicles.validation.modelRequired'),
  year: yup
    .number()
    .required('vehicles.validation.yearRequired')
    .min(1300, 'vehicles.validation.yearMin')
    .max(new Date().getFullYear() + 1, 'vehicles.validation.yearMax'),
  licensePlate: yup.string().required('vehicles.validation.licensePlateRequired'),
  vin: yup.string(),
  color: yup.string(),
}).required();

const VehicleForm = ({ customerId, onSubmit, onCancel, loading = false }: VehicleFormProps) => {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<VehicleFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      customerId: customerId
    }
  });

  const onSubmitHandler = (data: VehicleFormData) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('make')}
            fullWidth
            label={t('vehicles.make')}
            error={!!errors.make}
            helperText={errors.make && t(errors.make.message as string)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('model')}
            fullWidth
            label={t('vehicles.model')}
            error={!!errors.model}
            helperText={errors.model && t(errors.model.message as string)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('year', { valueAsNumber: true })}
            fullWidth
            type="number"
            label={t('vehicles.year')}
            error={!!errors.year}
            helperText={errors.year && t(errors.year.message as string)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('licensePlate')}
            fullWidth
            label={t('vehicles.licensePlate')}
            error={!!errors.licensePlate}
            helperText={errors.licensePlate && t(errors.licensePlate.message as string)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('vin')}
            fullWidth
            label={t('vehicles.vin')}
            error={!!errors.vin}
            helperText={errors.vin && t(errors.vin.message as string)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('color')}
            fullWidth
            label={t('vehicles.color')}
            error={!!errors.color}
            helperText={errors.color && t(errors.color.message as string)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            {onCancel && (
              <Button onClick={onCancel} disabled={loading}>
                {t('common.cancel')}
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {t('common.save')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VehicleForm;