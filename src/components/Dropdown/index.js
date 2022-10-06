import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import PropTypes from 'prop-types';

// Custom Dropdown
export default function Dropdown({
  label, value, onChange = () => {}, size = 'medium', items = []
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
        size={size}
      >
        {items && items.map((deviceType) => (
          <MenuItem key={deviceType?.value} value={deviceType?.value}>{deviceType?.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.array,
  size: PropTypes.string,
};
