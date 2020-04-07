import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { userLogged } from '../sevices'

const PrivateRoute = (props) => (
    <Fragment>
        { userLogged() ? props.children : <Redirect to='/'/> }
    </Fragment>
)

export default PrivateRoute;