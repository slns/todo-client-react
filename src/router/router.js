'use strict'

import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Header from '../components/organisms/header'
import Footer from '../components/organisms/footer'
import publicRoutes from './publicRoutes'
import { Container } from '@material-ui/core'

export default function Router () {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Header/>
         <main style={{ marginBottom: '3rem'}}>
         <Switch>
            {publicRoutes.routes.map((route) => {
             return (
                <Route
                  key={route.name}
                  exact={route.root}
                  path={route.path}
                  render={(props) => (<route.comp {...props}/>)}
                />
              )
            })}
          </Switch>
        </main>
      </Container>
      <Footer /> 
    </BrowserRouter>
  )
}
