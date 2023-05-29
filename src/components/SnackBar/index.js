import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { server_url } from 'src/api/app.js';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(0);
    // info, success, error, warning
    const [severity, setSeverity] = useState(0);
    // top, bottom
    const vertical = 'top'
    // left, right
    const horizontal = 'right'

    const openSnackbar = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        open = false;
    };

    function publishAxios(params) {
        axios({
            method: "post",
            url: `${server_url}/api/device/config`,
            data: params,
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            console.log(res.data)
            console.log(message, severity)
            openSnackbar(res.data.message, "success");
        }).catch((error) => {
            openSnackbar("123", "error");
            console.log(error);
        });
    }

    //   openSnackbar();

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
