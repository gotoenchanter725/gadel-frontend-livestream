import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

const DialogLeavingPage = ({
    showDialog,
    setShowDialog,
    cancelNavigation,
    confirmNavigation
}) => {
    const handleDialogClose = () => {
        setShowDialog(false);
    };

    return (
        <Dialog fullWidth open={showDialog} onClose={handleDialogClose}>
            <div style={{ marginLeft: 20, marginTop: 20 }} className='top-heading-sell'>Warning</div>
            <DialogContent>
                <div className='instruction-text'>There is a transaction in progress. If you proceed your transaction will be lost.</div>
                <div className='instruction-text'>Are you sure you want to proceed?</div>
            </DialogContent>
            <DialogActions>
                <div className="custom-button" onClick={cancelNavigation}>
                    No
                </div>
                <div className="fill-button" onClick={confirmNavigation}>
                    Yes
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default DialogLeavingPage;