import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TextField, 
  InputAdornment,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent
} from '@mui/material';

// FormTextField Component
interface FormTextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  type = 'text',
  disabled = false,
  multiline = false,
  rows = 1,
  placeholder = '',
  fullWidth = true,
  startAdornment,
  endAdornment,
}) => {
  const { t } = useTranslation();
  
  return (
    <TextField
      name={name}
      label={t(label)}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      type={type}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      fullWidth={fullWidth}
      variant="outlined"
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
    />
  );
};

// FormPhoneInput Component
interface FormPhoneInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  name,
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  placeholder = '09123456789',
}) => {
  const { t } = useTranslation();
  
  return (
    <TextField
      name={name}
      label={t(label)}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      inputProps={{
        maxLength: 11,
        pattern: '09[0-9]{9}',
      }}
    />
  );
};

// FormSelectField Component
interface FormSelectFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const FormSelectField: React.FC<FormSelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  fullWidth = true,
}) => {
  const { t } = useTranslation();
  
  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={error} 
      required={required} 
      disabled={disabled}
      variant="outlined"
    >
      <InputLabel id={`${name}-label`}>{t(label)}</InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        label={t(label)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

// FormCheckbox Component
interface FormCheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  const { t } = useTranslation();
  
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      }
      label={t(label)}
    />
  );
};
