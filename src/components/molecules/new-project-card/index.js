import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import { axiosInstance } from '../../../sevices/http/http';
import { validateFirstName } from '../../atoms/validet-inputs'
import './new-project-card.css';


export function NewProjectCard() {
    const [projectName, setProjectName] = useState();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [showingMessage, setShowingMessage] = useState(false);
    const [message, setMessage] = useState('');

    const styles = {
        input: {
            "&:invalid": {
                border: "red solid 2px"
            }
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function showMessage() {
        setShowingMessage(true);

        setTimeout(() => {
            setShowingMessage(false);
        }, 4000);
    }

    const createProject = async () => {
        const project = {
            name: projectName
        }
       
        try {
            const data = await axiosInstance.post('projects', project);
            const { status } = data;
            if (status) {
                setError(false)
                setProjectName('')
                document.getElementById("projectName").value = "";
                setOpen(false);
            };
        } catch (error) {
            setError(true)
            setMessage(error);
            showMessage();
        }
        
    }

    return (
        <div>
            <Grid container alignItems="flex-start"
                justify="center"
                direction="row"
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    Create new Project
                </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {/* <div> */}
                <div style={{display: `${showingMessage ? 'block' : 'none'}`}}>
                    <div className={error ? 'divError' : 'divSuccess'}>
                        <strong>{ message }</strong> 
                    </div>
                </div>
        <DialogTitle id="form-dialog-title">Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Put a name to your project.
          </DialogContentText>
          <TextField
            error={!errorName}
            autoFocus
            margin="dense"
            id="projectName"
            label="Project Name"
            type="text"
            fullWidth
            onChange={e => setProjectName(e.target.value)}
            onKeyUp = {
                e => validateFirstName(e.target.value) 
                    ? setErrorName(true)
                    : setErrorName(false)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            onClick={createProject} 
            color="primary"
            disabled={!errorName}>
            New project
          </Button>
          <Button 
            onClick={handleClose} 
            color="primary">                  
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}
