import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { axiosInstance } from '../../../sevices/http/http';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Switche(props) {
    const [checked, setChecked] = useState(props.checked);
    const [severity, setSeverity] = useState('');
    const [errorMessge, setErrorMessge] = useState('');
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;
    
    useEffect(() => {
        if (props.checked != checked) {
          updateTask();
        } 
    }, [checked]);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
        //updateTask();
    };

    const handleClick = (newState) => {
        setState({ open: true, ...newState });
    };
 
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setState({ ...state, open: false });
    };
    
    const updateTask = async () => {
        const task = {
            done: checked
        }
        console.log('UpdartTask', task)
        try {
            const data = await axiosInstance.put(`/tasks/${props.task.id}`, task);
            //const { status } = data;
            // if (status) {              
            //    props.history.push(`/tasks/${data.id}`);
            // };
            setSeverity('success');
            setErrorMessge(data.message);
            handleClick({ vertical: 'top', horizontal: 'center' });
        } catch (error) {
            console.log('Updarterror', error)
            setSeverity('error');
            setErrorMessge('error.response.data.message');
            handleClick({ vertical: 'top', horizontal: 'center' });
        }
    }

    return (
      <div>
        <FormGroup>
        <FormControlLabel
            control={<Switch color="primary" disabled={checked} checked={checked} onChange={toggleChecked} />}
            label="Done"
        />
        </FormGroup>
        <Snackbar
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                autoHideDuration={4000}
                onClose={handleClose}
            >
            <Alert onClose={handleClose} severity={severity}>
            There is an error in your login! <h5>{errorMessge}</h5>
            </Alert>
        </Snackbar>
    </div>
  );
}
