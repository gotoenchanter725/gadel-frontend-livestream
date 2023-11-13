import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

// Custom TextField
export default function CustomTextField({
  label, value, onChange = () => {}, variant = 'standard', fullWidth = true, styles = {}, type = ''
}) {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      style={styles}
      type={type}
    />
  );
}

CustomTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  styles: PropTypes.object,
  type: PropTypes.string
};
