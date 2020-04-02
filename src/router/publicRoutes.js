'use strict'

import Login from '../components/pages/login'
import SignUp from '../components/pages/sign-up'
import selectProjects from '../components/pages/projects/select'
import selectTasks from '../components/pages/tasks/select'

const publicRoutes = {
  rootPath: "/",
  routes: [
    {
      root: true,
      name: 'login',
      path: '/',
      comp: Login
    },
    {
      root: true,
      name: 'signUp',
      path: '/sign-up',
      comp: SignUp
    },
    {
      root: true,
      name: 'projects',
      path: '/projects',
      comp: selectProjects
    },
    {
      root: true,
      name: 'tasksProjectId',
      path: '/tasks/:field/:id',
      comp: selectTasks
    }
  ]
}

export default publicRoutes;
