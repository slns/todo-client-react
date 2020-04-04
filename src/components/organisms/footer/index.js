'use strict'

import React from 'react'
import { makeStyles } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to='/'>
        toDoit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  footer: {
    paddingBottom: '24px',
    position: 'fixed',
    bottom: 0,
    textAlign: 'center',
    width: '100%'
  }
}))

export default function Footer () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.footer}>
        <Box mt={5}>
        <Copyright />
      </Box>
      </div>
    </div>
  )
}
