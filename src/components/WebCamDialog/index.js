import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Grid,
    IconButton,
    SvgIcon,
    Dialog,
    Divider,
    CardContent,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    X as XIcon,
} from 'react-feather';
import Webcam from "react-webcam";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {},
    modalTitle: {
        paddingLeft: 10,
        paddingTop: 10,
        fontFamily: 'Poppins !important'
    },
    actions: {
        marginTop: theme.spacing(1.5),
        display: 'flex',
        justifyContent: 'flex-end',
        '& > * + *': {
            marginLeft: theme.spacing(2)
        }
    }
}));

function WebCamDialog({
    openModal,
    handleModalClose,
    file,
    setFile
}) {
    const classes = useStyles();
    const webcamRef = useRef(null);

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }



    const handleTakePicture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const image = dataURLtoFile(imageSrc, 'selfie')
        setFile(image);
    }

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
                            Take Picture
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
                            <Webcam
                                ref={webcamRef}
                                style={{ width: '100%' }}
                                screenshotFormat="image/png"
                            />
                            <div className={classes.actions}>
                                <div className='fill-button' onClick={handleTakePicture}>
                                    Take Picture
                                </div>
                                <div className={`fill-button ${!file && 'disabled'}`} onClick={handleModalClose}>
                                    Upload
                                </div>
                            </div>
                        </CardContent>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
}

WebCamDialog.propTypes = {
    openModal: PropTypes.bool,
    handleModalClose: PropTypes.func,
    file: PropTypes.object,
    setFile: PropTypes.func,
};

export default WebCamDialog;
