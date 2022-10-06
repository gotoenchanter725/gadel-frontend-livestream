import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import SweetAlert from 'react-bootstrap-sweetalert';
import useStyles from './Styles';

function CustomSweetAlert({
  success, info, danger, warning, error, title, onConfirm, onCancel, confirmBtnText, cancelBtnText, showCancel, caption
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <SweetAlert
      customClass={success ? classes.sweetAlertSuccess : classes.sweetAlert}
      style={{
        backgroundColor: theme.palette.background.default,
        fontFamily: 'Poppins'
      }}
      success={success}
      info={info}
      danger={danger}
      warning={warning}
      error={error}
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmBtnText={confirmBtnText}
      cancelBtnText={cancelBtnText}
      confirmBtnCssClass={classes.sweetAlertOKButton}
      cancelBtnCssClass={classes.sweetAlertCancelButton}
      showCancel={showCancel}
    >
      {caption}
    </SweetAlert>
  );
}

CustomSweetAlert.propTypes = {
  success: PropTypes.bool,
  info: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  error: PropTypes.bool,
  showCancel: PropTypes.bool,
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  caption: PropTypes.string
};

export default CustomSweetAlert;
