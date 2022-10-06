import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useStateValue } from 'src/services/state/State';

function GuestRoute({ component: Component, render, ...rest }) {
  const [{user}, dispatch] = useStateValue();

  if (user) {
    return <Navigate to="/" />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
}

GuestRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func
};

export default GuestRoute;
