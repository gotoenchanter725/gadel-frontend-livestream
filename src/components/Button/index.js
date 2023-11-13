import React from 'react';
import {
  Button
} from '@mui/material';
import PropTypes from 'prop-types';

// Custom Dropdown
export default function CustomButton({
  label, onClick = () => {}, className = 'button', variant = 'contained',
}) {
  return (
    <div style={{ marginTop: 20 }}>
      <Button
        variant={variant}
        onClick={onClick}
        className={className}
      >
        {label}
      </Button>
    </div>
  );
}

CustomButton.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
