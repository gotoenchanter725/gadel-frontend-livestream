import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

// Custom AutoComplete
export default function AutoComplete({
  label, items = [], disabled = false, InputProps = {}, onChange = () => {}, placeholder = '', className = null, variant
}) {
  const [open, setOpen] = useState(false)

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      className={className}
      options={items}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={onChange}
      disabled={disabled}
      getOptionLabel={(option) => option.title}
      style={{ backgroundColor: '#FFFFFF' }}
      classes={{
        input: 'font-family',
      }}
      renderInput={(params) => <TextField {...params} variant={variant} label={label} placeholder={placeholder} InputProps={{...params.InputProps, ...InputProps}} />}
    />
  );
}

AutoComplete.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.array,
  disabled: PropTypes.bool,
  InputProps: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string
};
