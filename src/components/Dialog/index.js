import React from 'react';
import { withStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Dialog, Typography, IconButton, DialogContent as MuiDialogContent, DialogTitle as MuiDialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
    marginLeft: 10
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 10,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    minWidth: `450px !important`,
  },
}))(MuiDialogContent);

const CustomizedDialog = ({ title, open, handleClose, backIcon, onBackClick, children }) => {

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {backIcon && (
        <div onClick={onBackClick} style={{ cursor: 'pointer' }}>
          <ArrowBack style={{ position: 'absolute', top: 20, left: 10 }} />
        </div>
      )}
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default CustomizedDialog;

CustomizedDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.array,
  backIcon: PropTypes.bool,
  onBackClick: PropTypes.func,
}