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

import './update-object-card.css';

import axios from 'axios'


export function UpdateObjectCard(props) {
    const [objectName, setObjectName] = useState(props.name === 'Project' ? props.object.name : props.object.description);
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

    const updateObject = async () => {
        let object = {};
        props.field === 'projects'
            ? object.name = objectName
            : object = {
                description: objectName,
                projectId: props.objectId
            };
        const createCancelToken = () => axios.CancelToken.source()
        const cancelToken = createCancelToken()
        try {
            const data = await axiosInstance.put(`${props.field}/${props.object.id}`, object,{
                cancelToken: cancelToken.token
            });
            const { status } = data;            
            if (status) {
                setError(false);
                setMessage(`${props.name} successfully updated.`);
                ref.current.handleClick();
                // setObjectName('')
                // document.getElementById("objectName").value = "";
                //setOpen(false);
                props.action();
            };
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            }
            ref.current.handleClick();
            setError(true)
            setMessage(error);
        }       
    }

    return (
        <div>
            <Grid container alignItems="flex-start" justify="center" direction="row" >
               <Button size="small" color="primary" onClick={handleClickOpen}>
                    Edit
               </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <MessageAlert ref={ref} message={message} error={error}/>
                <DialogTitle id="form-dialog-title">{props.name}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                        Edit a {props.name === 'Project' ? 'name' : 'description'} to your {props.name}.
                </DialogContentText>
                    <TextField error={!errorName} autoFocus margin="dense" id="objectName"
                        label={`${props.name} ${props.name === 'Project' ? 'name' : 'description'}`}
                        type="text" fullWidth onChange={e => setObjectName(e.target.value)} value={objectName}
                        onKeyUp = {
                            e => validateName(e.target.value)
                                ? setErrorName(true)
                                : setErrorName(false)
                        }
                />
                </DialogContent>
                <DialogActions>
                <Button variant="contained" onClick={updateObject} color="primary" disabled={!errorName}>
                    Edit {props.name}
                </Button>
                <Button onClick={handleClose} color="primary">                  
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}
