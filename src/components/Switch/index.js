import React from 'react';
import {
  Switch as MUISwitch
} from '@mui/material';
import PropTypes from 'prop-types';

// Custom Dropdown
export default function Switch({
  label, value, marginTop, onChange = () => {}
}) {
  return (
    <div className="custom-row" style={{ justifyContent: 'space-between', marginTop }}>
      <div className="label">{label}</div>
      <MUISwitch
        value={value}
        defaultChecked={false}
        onChange={onChange}
      />
    </div>
  );
}

Switch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  marginTop: PropTypes.number,
};
