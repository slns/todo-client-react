import React, { useState, useRef } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import { axiosInstance } from '../../../sevices/http/http';
import { validateName } from '../../atoms/validet-inputs';
import MessageAlert from '../../atoms/message-alert';

import './new-object-card.css';


export function NewObjectCard(props) {
    const [objectName, setObjectName] = useState();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [message, setMessage] = useState('');

    const ref = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createObject = async () => {
        const object = {
            name: objectName
        }
        try {
            const data = await axiosInstance.post(`${props.field}`, object);
            const { status } = data;
            if (status) {
                setError(false);
                setMessage('Object successfully created.');
                ref.current.handleClick();
                setObjectName('')
                document.getElementById("objectName").value = "";
                //setOpen(false);
                props.action();
            };
        } catch (error) {
            ref.current.handleClick();
            setError(true)
            setMessage(error);
        }       
    }

    return (
        <div>
            <Grid container alignItems="flex-start" justify="center" direction="row" >
                <Button variant="contained" color="primary" onClick={handleClickOpen} >
                    Create new {props.object}
                </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <MessageAlert ref={ref} message={message} error={error}/>
                <DialogTitle id="form-dialog-title">{props.object}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                        Put a {props.object === 'Project' ? 'name' : 'description'} to your {props.object}.
                </DialogContentText>
                <TextField error={!errorName} autoFocus margin="dense" id="objectName" label={`${props.object} Name`}
                    type="text" fullWidth onChange={e => setObjectName(e.target.value)}
                    onKeyUp = {
                        e => validateName(e.target.value)
                            ? setErrorName(true)
                            : setErrorName(false)
                    }
                />
                </DialogContent>
                <DialogActions>
                <Button variant="contained" onClick={createObject} color="primary" disabled={!errorName}>
                    New {props.object}
                </Button>
                <Button onClick={handleClose} color="primary">                  
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}
