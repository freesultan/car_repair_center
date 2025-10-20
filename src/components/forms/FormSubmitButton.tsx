import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FormSubmitButtonProps extends ButtonProps {
  loading?: boolean;
  label: string;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  loading = false,
  label,
  ...rest
}) => {
  const { t } = useTranslation();
  
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
      {...rest}
    >
      {t(label)}
    </Button>
  );
};

export default FormSubmitButton;
