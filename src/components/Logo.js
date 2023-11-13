import React from 'react';
import Icon from 'src/assets/logo.png';

const logoStyle = {
  width: 55
};

function Logo(props) {
  return <img alt="Logo" style={logoStyle} src={Icon} {...props} />;
}

export default Logo;
