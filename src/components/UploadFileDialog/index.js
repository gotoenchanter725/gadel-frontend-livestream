import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  SvgIcon,
  Dialog,
  Divider,
  CardContent
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  X as XIcon,
} from 'react-feather';
import FileDropzone from 'src/components/FileDropzone';

const useStyles = makeStyles(() => ({
  root: {},
  modalTitle: {
    paddingLeft: 10,
    paddingTop: 10,
    fontFamily: 'Poppins !important'
  },
}));

function UploadFileDialog({
  openModal,
  handleModalClose,
  file,
  setFile,
  title = 'Upload Image/PDF',
}) {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleModalClose}
      open={openModal}
    >
      <Box m={3}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={10}
            md={11}
            lg={11}
          >
            <div className='modal-title'>
              {title}
            </div>
          </Grid>
          <Grid
            item
            xs={2}
            md={1}
            lg={1}
            align="right"
          >
            <IconButton
              onClick={handleModalClose}
            >
              <SvgIcon fontSize="small">
                <XIcon />
              </SvgIcon>
            </IconButton>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Divider />
            <CardContent>
              <FileDropzone fileType=".jpg, .png, .jpeg" file={file} setFile={setFile} handleModalClose={handleModalClose} />
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

UploadFileDialog.propTypes = {
  openModal: PropTypes.bool,
  handleModalClose: PropTypes.func,
  file: PropTypes.object,
  setFile: PropTypes.func,
  title: PropTypes.string,
};

export default UploadFileDialog;

