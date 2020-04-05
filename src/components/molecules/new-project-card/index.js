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

import './new-project-card.css';


export function NewProjectCard(props) {
    const [projectName, setProjectName] = useState();
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

    const createProject = async () => {
        const project = {
            name: projectName
        }
        try {
            const data = await axiosInstance.post('projects', project);
            const { status } = data;
            if (status) {
                setError(false);
                setMessage('Project successfully created.');
                ref.current.handleClick();
                setProjectName('')
                document.getElementById("projectName").value = "";
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
                    Create new Project
                </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <MessageAlert ref={ref} message={message} error={error}/>
                <DialogTitle id="form-dialog-title">Project</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Put a name to your project.
                </DialogContentText>
                <TextField error={!errorName} autoFocus margin="dense" id="projectName" label="Project Name"
                    type="text" fullWidth onChange={e => setProjectName(e.target.value)}
                    onKeyUp = {
                        e => validateName(e.target.value)
                            ? setErrorName(true)
                            : setErrorName(false)
                    }
                />
                </DialogContent>
                <DialogActions>
                <Button variant="contained" onClick={createProject} color="primary" disabled={!errorName}>
                    New project
                </Button>
                <Button onClick={handleClose} color="primary">                  
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}
