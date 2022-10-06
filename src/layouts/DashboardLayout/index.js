import React from 'react';
import {
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function ResponsiveDrawer(props) {
  const { children } = props;

  return (
    <Box>
      {children}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  children: PropTypes.element
};
