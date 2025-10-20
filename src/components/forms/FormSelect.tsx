import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps extends Omit<SelectProps, 'error'> {
  name: string;
  label: string;
  options: Option[];
  error?: boolean;
  helperText?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  error,
  helperText,
  value,
  onChange,
  ...rest
}) => {
  const { t } = useTranslation();
  
  const labelId = `${name}-label`;

  return (
    <FormControl fullWidth margin="normal" error={error}>
      <InputLabel id={labelId}>{t(label)}</InputLabel>
      <Select
        labelId={labelId}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        label={t(label)}
        {...rest}
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

export default FormSelect;
