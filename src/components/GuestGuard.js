import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useStateValue } from 'src/services/state/State';

function GuestGuard({ children }) {
  const [state] = useStateValue();
  const account = state;

  if (account.user) {
    return <Navigate to="/" />;
  }

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.any
};

export default GuestGuard;
