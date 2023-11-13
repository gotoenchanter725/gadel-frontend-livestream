import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from 'notistack';
import { useStateValue } from '../../services/state/State';
import { actions } from '../../services/state/Reducer';
import { TextField } from '../index';

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export default function ChangePasswordDialog({
  open, setOpen, selectedUser, setSelectedUser
}) {
  // store
  const [{ users }, dispatch] = useStateValue();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  // close dialog and clear selectedUser
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  // update password for user in store
  const handleUpdatePassword = () => {
    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      enqueueSnackbar(`Please enter ${currentPassword === '' ? 'current' : newPassword === '' ? 'new' : 'confirm'
      } password`, {
        variant: 'error',
      });
    } else if (currentPassword.length < 8 || newPassword.length < 8 || confirmPassword.length < 8) {
      enqueueSnackbar(`${currentPassword === '' ? 'Current' : newPassword === '' ? 'New' : 'Confirm'
      } password length must be greater than or equal to 8`, {
        variant: 'error',
      });
    } else if (newPassword !== confirmPassword) {
      enqueueSnackbar('Passwords does not match', {
        variant: 'error',
      });
    } else {
      const data = [...users];
      const index = data.findIndex((item) => item.id === selectedUser.id);
      const item = {
        ...selectedUser,
        password: newPassword
      };
      data[index] = item;
      dispatch({
        type: actions.SET_USER,
        payload: data
      });
      enqueueSnackbar('Password successfully updated', {
        variant: 'success',
      });
      setOpen(false);
      setSelectedUser(null);
    }
  };

  // change value in textfield
  const handleCurrentPassword = (e) => {
    const { value } = e.target;
    setCurrentPassword(value);
  };

  // change value in textfield
  const handleNewPassword = (e) => {
    const { value } = e.target;
    setNewPassword(value);
  };

  // change value in textfield
  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {/* Custom TextField */}
          <TextField
            label="Current Password"
            variant="standard"
            fullWidth
            value={currentPassword}
            onChange={handleCurrentPassword}
            style={styles.textbox}
            type="password"
          />
          {/* Custom TextField */}
          <TextField
            label="New Password"
            variant="standard"
            fullWidth
            value={newPassword}
            onChange={handleNewPassword}
            style={styles.textbox}
            type="password"
          />
          {/* Custom TextField */}
          <TextField
            label="Confirm Password"
            variant="standard"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPassword}
            style={styles.textbox}
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleUpdatePassword}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const styles = {
  textbox: {
    marginTop: 10
  }
};
