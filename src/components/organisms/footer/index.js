'use strict'

import React from 'react'
import { makeStyles } from '@material-ui/core'

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
        Made by community for the community.
      </div>
    </div>
  )
}
