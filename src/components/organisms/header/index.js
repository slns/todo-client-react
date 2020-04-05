'use strict'

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'

import { getUserSession, userLogged } from '../../../sevices/http'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontFamily: ['Montserrat', 'sans-serif'],
    fontSize: '1.75rem',
    fontWeight: 'bold'
  },
  subtitle: {
    flexGrow: 1,
    alignSelf: 'flex-end'
  },
  link: {
    color: 'black',
    textDecoration: 'none'
  }
}))

export default function Header () {
  const [auth, setAuth] = useState();
  const [userName, setUserName] = useState('');

  const classes = useStyles();

  useEffect(() => {
    showUserName();
    setAuth(userLogged())
  }, []);
    
  const appBarCustomStyle = {
    background: 'transparent',
    boxShadow: 'none',
    color: 'black',
    fontWeight: 'bold'
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(userLogged());
  };

  const showUserName = () => {
    const user = getUserSession();
    if (user) {
      return setUserName(user.name);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' style={appBarCustomStyle}>
        <Toolbar style={{ paddingLeft: 0 }}>
          <Typography variant='h5' className={classes.title}>
            <Link to='/' className={classes.link}>
              toDoit
            </Link>
          </Typography>
          {auth && (
            <div>
              <Button color='inherit'>
                <Link to='/projects' className={classes.link}>
                  Projects
                </Link>
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                <Link to='/' className={classes.link}>
                  Logout
                </Link>
              </Button>

              <span className={classes.link}> {userName} </span>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
