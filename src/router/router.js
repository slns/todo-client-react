'use strict'

import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Container } from '@material-ui/core';

import Header from '../components/organisms/header';
import Footer from '../components/organisms/footer';
import { listPublicRoutes, listPrivateRoutes } from './routes-list';
import PrivateRoute from './privateRoutes';
import NotFound from '../components/pages/not-found';
import { userLogged } from '../sevices';

export default function Router(props) {

  return (
    <BrowserRouter >
      <Container maxWidth="md">
        {/* <Header/> */}
         <main style={{ marginBottom: '3rem'}}>
         <Switch>
              {listPublicRoutes.routes.map((route) => {
              return (
                  <Route
                    key={route.name}
                    exact={route.root}
                    path={route.path}
                    render={(props) => (<route.component {...props}/>)}
                  />
                )
              })}
            {/* <PrivateRoute> */}
              {listPrivateRoutes.routes.map((route) => (route.component ? (
                  <Route
                    key={route.name}
                    exact={route.root}
                    path={route.path}
                    render={(props) => (
                      userLogged()
                        ? <route.component {...props} />
                        : <Redirect to="/" />
                    )}
                  />
                ) : (null)))
            }          
              <Route component={NotFound} />
          </Switch>
        </main>
      </Container>
      <Footer /> 
    </BrowserRouter>
  )
}
