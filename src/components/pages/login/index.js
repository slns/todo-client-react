import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { axiosInstance } from '../../../sevices/http/http';
import { validateEmail, validatePassword } from '../../atoms/validet-inputs';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
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
  link: {
      color: 'black',
      textDecoration: 'none'
    },
    title: {
      flexGrow: 1,
      fontFamily: ['Montserrat', 'sans-serif'],
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginTop: '15px'
    }
}));

export default function Login(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorValidateForm, setErrorValidateForm] = useState(true);
    const [errorMessge, setErrorMessge] = useState('');

    const emailValidate = () => {
      !validateEmail(email) ? setErrorEmail(true) : setErrorEmail(false);
      validateForm();
    }
    const passwordValidate = () => {
      !validatePassword(password) ? setErrorPassword(true) : setErrorPassword(false);
      validateForm();
    }
    function validateForm() {
      !errorPassword && !errorEmail ? setErrorValidateForm(true) : setErrorValidateForm(false);
    }
  
  const handleSubmit = event => {

    event.preventDefault();

      const user = {
        email: email,
        password: password
      };
    
      axiosInstance.post('login', user)
      .then(function (response) {
        props.history.push("/projects");
        })
        .catch(function (error) {
          setErrorMessge(error.response.data.message);
          handleClick({ vertical: 'top', horizontal: 'center' })
          props.history.push("/");
        });
  }

  return (
    <div>
      <Typography variant='h5' className={classes.title}>
            <Link to='/' className={classes.link}>
              toDoit
            </Link>
      </Typography>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            error={errorEmail}
            helperText={errorEmail? 'Not a valid email! ' : ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            onKeyUp={emailValidate}
          />
          <TextField
            error={ errorPassword}
            helperText = { errorPassword ? 'Password less 6 charaters! ' : '' }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            onKeyUp={passwordValidate}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            disabled={errorValidateForm}
            variant="contained"
            color="primary"
            className={classes.submit}
            >Sign In</Button>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              There is an error in your login! <h5>{errorMessge}</h5>
            </Alert>
          </Snackbar>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> 
        </form>
      </div>
      </Container>
      </div>
  );
}