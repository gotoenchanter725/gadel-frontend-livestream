/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import bytesToSize from 'src/utils/bytesToSize';
import filedropzone from 'src/assets/svgs/file_dropzone.svg';

const useStyles = makeStyles((theme) => ({
    root: {},
    dropZone: {
        border: `1px dashed ${theme.palette.divider}`,
        padding: 30,
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            opacity: 0.5,
            cursor: 'pointer'
        }
    },
    dragActive: {
        backgroundColor: theme.palette.action.active,
        opacity: 0.5
    },
    image: {
        width: 130
    },
    info: {
        marginTop: theme.spacing(1)
    },
    list: {
        maxHeight: 320
    },
    actions: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
        '& > * + *': {
            marginLeft: theme.spacing(2)
        }
    }
}));

function FileDropzone({
    fileType, file, setFile, handleModalClose, className, isBase64, ...rest
}) {
    const classes = useStyles();

    const handleDrop = useCallback((acceptedFile) => {
        setFile(acceptedFile[0]);
    }, []);

    const handleRemove = () => {
        setFile(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: fileType,
        onDrop: handleDrop,
    });

    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <div
                className={clsx({
                    [classes.dropZone]: true,
                    [classes.dragActive]: isDragActive
                })}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div>
                    <img
                        alt="Select file"
                        className={classes.image}
                        src={filedropzone}
                    />
                </div>
                <div>
                    <div className='modal-title'>
                        Select file
                    </div>
                    <Box mt={2}>
                        <div className='modal-message'>
                            Drop file here or click
                            {' '}
                            <Link underline="always">browse</Link>
                            {' '}
                            thorough your machine
                        </div>
                    </Box>
                </div>
            </div>
            {file && (
                <>
                    <PerfectScrollbar options={{ suppressScrollX: true }}>
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemIcon>
                                    <FileCopyIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={file.name}
                                    primaryTypographyProps={{ variant: 'h6', fontFamily: 'Poppins' }}
                                    secondary={bytesToSize(file.size)}
                                />
                            </ListItem>
                        </List>
                    </PerfectScrollbar>
                    <div className={classes.actions}>
                        <div className='custom-button' onClick={handleRemove}>
                            Remove File
                        </div>
                        <div className='fill-button' onClick={handleModalClose}>
                            Upload
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

FileDropzone.propTypes = {
    className: PropTypes.string,
    fileType: PropTypes.string,
    file: PropTypes.object,
    setFile: PropTypes.func,
    handleModalClose: PropTypes.func,
    isBase64: PropTypes.bool
};

export default FileDropzone;
