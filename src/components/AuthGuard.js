import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useStateValue } from 'src/services/state/State';

function AuthGuard({ children }) {
  const [{ user }] = useStateValue(); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
