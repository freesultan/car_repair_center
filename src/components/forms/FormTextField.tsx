import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

type FormTextFieldProps = TextFieldProps & {
  name: string;
  error?: boolean;
  helperText?: string;
};

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  error,
  helperText,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Use translation for label if it's a string
  const translatedLabel = typeof label === 'string' 
    ? t(label) 
    : label;
  
  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={translatedLabel}
      error={error}
      helperText={helperText}
      margin="normal"
      {...rest}
    />
  );
};

export default FormTextField;
