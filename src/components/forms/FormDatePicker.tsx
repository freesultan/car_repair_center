import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Note: In a real implementation, we would use a proper date picker component
// with Persian calendar support (like @date-io/date-fns-jalali or similar)
// For now, we're using a simple text field as a placeholder

type FormDatePickerProps = Omit<TextFieldProps, 'type'> & {
  name: string;
  error?: boolean;
  helperText?: string;
};

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  error,
  helperText,
  ...rest
}) => {
  const { t } = useTranslation();
  
  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={t(label as string)}
      type="date"
      error={error}
      helperText={helperText}
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      {...rest}
    />
  );
};

export default FormDatePicker;
