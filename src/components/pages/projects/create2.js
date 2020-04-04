import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { axiosInstance } from '../../../sevices/http/http';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class createProject extends Component {

  constructor(props){
    super(props)
    this.state = {
      recentProject: []
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    console.log('fffffffrfffff')

      // const user = {
      //   email: email,
      //   password: password
      // };
    
      // axiosInstance.post('login', user)
      // .then(function (response) {
      //   props.history.push("/projects");
      //   })
      //   .catch(function (error) {
      //     setErrorMessge(error.response.data.message);
      //     handleClick({ vertical: 'top', horizontal: 'center' })
      //     props.history.push("/");
      //   });
  }

  render() {
    const {classes} = this.props;
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  onSubmit={this.handleSubmit}>
          <TextField
            // error={errorEmail}
            // helperText={errorEmail? 'Not a valid email! ' : ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            // onChange={e => setEmail(e.target.value)}
            // onKeyUp={emailValidate}
          />
          <TextField
            // error={ errorPassword}
            // helperText = { errorPassword ? 'Password less 6 charaters! ' : '' }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // onChange={e => setPassword(e.target.value)}
            // onKeyUp={passwordValidate}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            // disabled={errorValidateForm}
            variant="contained"
            color="primary"
            className={classes.submit}
          >Sign In</Button>
          {/* <Snackbar
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              There is an error in your login! <h5>{errorMessge}</h5>
            </Alert>
          </Snackbar> */}
        </form>
      </div>
     </Container>
    )
  }

}

export default withStyles(styles)(createProject);
