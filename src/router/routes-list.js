'use strict'

import Login from '../components/pages/login'
import SignUp from '../components/pages/sign-up'
import selectProjects from '../components/pages/projects/select'
import createProject from '../components/pages/projects/create2'
import selectTasks from '../components/pages/tasks/select'
import NotFound from '../components/pages/not-found'

const listPublicRoutes = {
  rootPath: "/",
  routes: [
    {
      root: true,
      name: 'login',
      path: '/',
      component: Login
    },
    {
      root: true,
      name: 'signUp',
      path: '/sign-up',
      component: SignUp
    },
    {
      root: true,
      name: 'createProject',
      path: '/create-project',
      component: createProject
    }
  ]
}

const listPrivateRoutes = {
  rootPath: "/",
  routes: [
    {
      root: true,
      name: 'projects',
      path: '/projects',
      component: selectProjects
    },
    {
      root: true,
      name: 'tasksProjectId',
      path: '/tasks/project/:id',
      component: selectTasks
    },
    {
      root: true,
      name: 'tasksProjectId',
      path: '/tasks/user/:id',
      component: selectTasks
    },
    {
      root: true,
      name: 'tasksProjectId',
      path: '/tasks/task/:id',
      component: selectTasks
    },
    // {
    //   root: false,
    //   name: 'tasksProjectId',
    //   path: '/tasks/:field/:id',
    //   component: selectTasks
    // }
  ]
}

export {
    listPublicRoutes,
    listPrivateRoutes
};
