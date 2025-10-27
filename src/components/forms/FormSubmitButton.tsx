import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface FormSubmitButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  startIcon?: React.ReactNode;
  onClick?: () => void;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  label,
  loading = false,
  disabled = false,
  fullWidth = true,
  variant = 'contained',
  color = 'primary',
  startIcon = <SaveIcon />,
  onClick,
}) => {
  const { t } = useTranslation();
  
  return (
    <Button
      type={onClick ? 'button' : 'submit'}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={loading ? null : startIcon}
      onClick={onClick}
    >
      {loading ? <CircularProgress size={24} /> : t(label)}
    </Button>
  );
};

export default FormSubmitButton;
