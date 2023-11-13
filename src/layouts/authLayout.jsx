import React from 'react';
import {
    Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Header } from 'src/components';

const SwitchLayout = (props) => {
    return (
        <Box>
            <Header path={props.path} />
            {props.children}
        </Box>
    );
}

export default SwitchLayout;