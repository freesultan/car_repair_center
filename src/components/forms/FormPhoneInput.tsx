import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

// A specialized input for Persian phone numbers
type FormPhoneInputProps = Omit<TextFieldProps, 'type'> & {
  name: string;
  error?: boolean;
  helperText?: string;
};

const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  name,
  label,
  error,
  helperText,
  onChange,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Handle phone number formatting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    // Update the input with the cleaned value
    e.target.value = value;
    
    if (onChange) {
      onChange(e);
    }
  };
  
  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={t(label as string)}
      type="tel"
      error={error}
      helperText={helperText}
      margin="normal"
      onChange={handleChange}
      inputProps={{
        maxLength: 11, // Standard Iranian mobile number length
        dir: 'ltr', // Phone numbers are always LTR even in RTL contexts
      }}
      {...rest}
    />
  );
};

export default FormPhoneInput;
