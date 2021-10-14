import { Login } from 'pages/Login';
import React, { FC, memo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RoutingPath } from 'utils/routing';

const Routes: FC = memo(() => (
  <BrowserRouter>
    <Switch>
      <Route path={RoutingPath.LOGIN} component={Login} exact />
    </Switch>
  </BrowserRouter>
));

export { Routes };
