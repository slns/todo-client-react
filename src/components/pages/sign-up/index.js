import React, { useState }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { axiosInstance } from '../../../sevices/http/http';
import {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword
} from '../../atoms/validet-inputs';


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
    marginTop: theme.spacing(3),
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

export default function SignUp(props) {
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
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorPasswordMatch, setErrorPasswordMatch] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorFirstName, setErrorFirstName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorValidateForm, setErrorValidateForm] = useState(true);
    const [errorMessge, setErrorMessge] = useState('');

    const firstNameValidate = () => {
        !validateFirstName(firstName) ? setErrorFirstName(true) : setErrorFirstName(false);
        validateForm();
    }
    const lastNameValidate = () => {
        !validateLastName(lastName) ? setErrorLastName(true) : setErrorLastName(false);
        validateForm();
    }
    const emailValidate = () => {
        !validateEmail(email) ? setErrorEmail(true) : setErrorEmail(false);
        validateForm();
    }
    const passwordValidate = () => {
        const testPassword = validatePassword(password);
        const testConfirmPassword = validatePassword(confirmPassword);

        !testPassword ? setErrorPassword(true) : setErrorPassword(false);
        !testConfirmPassword ? setErrorConfirmPassword(true) : setErrorConfirmPassword(false);
    
        password !== confirmPassword ? setErrorPasswordMatch(true) : setErrorPasswordMatch(false);   
        validateForm();
    }

    function validateForm() {
        const formValid = !errorPasswordMatch && !errorConfirmPassword && !errorPassword && !errorFirstName && !errorLastName && !errorEmail;
        formValid ? setErrorValidateForm(true) : setErrorValidateForm(false);
    }
  
  const handleSubmit = event => {
    event.preventDefault();

      const user = {
        name: `${firstName}  ${lastName}`,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      };
    
      axiosInstance.post('users', user)
      .then(function (response) {
        console.log('Login  response', response);
        props.history.push("/");
        })
        .catch(function (error) {
            setErrorMessge(error.response.data.message);
            handleClick({ vertical: 'top', horizontal: 'center' })
            props.history.push("/sign-up");
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorFirstName}
                helperText={errorFirstName? 'Not a valid Name! ' : ''}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setFirstName(e.target.value)}
                onKeyUp={firstNameValidate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorLastName}
                helperText={errorLastName? 'Not a valid Name! ' : ''}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => setLastName(e.target.value)}
                onKeyUp={lastNameValidate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorEmail}
                helperText={errorEmail? 'Not a valid email! ' : ''}
                variant="outlined"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
                onKeyUp={emailValidate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorPasswordMatch || errorPassword}
                helperText = {
                    (errorPassword || errorPasswordMatch
                        ? (errorPassword ? 'Password less 6 charaters! ' : 'Password not match')
                        : '')
                }
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorPasswordMatch || errorConfirmPassword}
                helperText = {
                    (errorConfirmPassword || errorPasswordMatch
                        ? (errorConfirmPassword ? 'Password less 6 charaters! ' : 'Password not match')
                        : '')
                }
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id = "confirmPassword"
                autoComplete="current-password"
                onChange={e => setConfirmPassword(e.target.value)}
                onKeyUp={passwordValidate}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={errorValidateForm}
            variant="contained"
            color="primary"
            className={classes.submit}
          >Sign Up</Button>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              There is an error in your register! <h5>{errorMessge}</h5>
            </Alert>
          </Snackbar>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
      </Container>
      </div>
  );
}