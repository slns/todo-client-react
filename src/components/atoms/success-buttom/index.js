'use strict'

import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  hoot: {
    color: 'white',
    backgroundColor: 'green',
    padding: '.5rem 1rem .5rem 1rem',
    margin: '1rem 0'
  }
}))

export default function SuccessButton (props) {
  const classes = useStyles()
  
  return (
    <Button className={classes.hoot}>
      { props.label }
    </Button>
  )
}
