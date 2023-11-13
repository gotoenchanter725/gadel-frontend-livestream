import React from 'react';
import { TextField, Box, Input, InputLabel, InputAdornment, FormControl} from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import PropTypes from 'prop-types';

// Custom TextField
export default function SearchBar({
  label = "", value, onChange = () => {}, variant = 'standard', fullWidth = true, placeholder = ""
}) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        id="input-with-icon-textfield"
        label={label}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        onChange={onChange}
        variant={variant}
        fullWidth={fullWidth}
      />
    </Box>
  );
}

SearchBar.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
};
