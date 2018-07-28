import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Home from './routes/Home';
import Login from './routes/login';
import { home_child_route } from './routes/home_child/route';
import { login_route } from './routes/login/route';


export const root_route = {
  childRoutes: [
    {
      path: '/',
      component: Home,
      childRoutes: [
        home_child_route,
        login_route
      ]
    },
  ]
};