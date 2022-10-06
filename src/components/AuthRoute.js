import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useStateValue } from 'src/services/state/State';

function AuthRoute({ component: Component, render, ...rest }) {
  const [state, dispatch] = useStateValue();

  if (!state.user) {
    return <Navigate to="/login" />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
}

AuthRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func
};

export default AuthRoute;
