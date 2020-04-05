import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { axiosInstance } from '../../../sevices/http/http';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

//const useForceUpdate = () => useState()[1];


export default function DeletedConfirmation(props) {
  const [open, setOpen] = useState(false);
  const [, forceUpdate] = useState();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
    const handleDelete = event => {
        event.preventDefault();
    
      axiosInstance.delete(`/${props.field}/${props.id}`)
      .then(function (response) {
        handleClose();
        props.action();
        })
        .catch(function (error) {
          setErrorMessge('error.response.data.message');
          handleClick({ vertical: 'top', horizontal: 'center' })
          props.history.push("/");
        });
  }

  return (
    <div>
      <IconButton aria-label="delete" color="secondary" onClick={handleClickOpen}>
            <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={handleDelete} color="primary">
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
