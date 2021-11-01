import { FC, memo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LoggedArea } from 'pages/LoggedArea';
import { Login } from 'pages/Login';
import { Registration } from 'pages/Registration';
import { ForgotPassword } from 'pages/ForgotPassword';
import { ResetPassword } from 'pages/ResetPassword';
import { AccountConfirmation } from 'pages/AccountConfirmation';
import { Accompaniment } from 'pages/Accompaniment';

import { RoutingPath } from 'utils/routing';
import { SimulateLoan } from 'pages/SimulateLoan';

const Routes: FC = memo(() => (
  <BrowserRouter>
    <Switch>
      <Route path={RoutingPath.LOGIN} component={Login} exact />

      <Route path={RoutingPath.REGISTRATION} component={Registration} />

      <Route path={RoutingPath.FORGOT_PASSWORD} component={ForgotPassword} />

      <Route path={RoutingPath.RESET_PASSWORD} component={ResetPassword} />

      <Route
        path={RoutingPath.ACCOUNT_CONFIRMATION}
        component={AccountConfirmation}
      />

      <Route path={RoutingPath.LOGGEDAREA} component={LoggedArea} exact />

      <Route path={RoutingPath.ACCOMPANIMENT} component={Accompaniment} exact />

      <Route path={RoutingPath.SIMULATE_LOAN} component={SimulateLoan} exact />
    </Switch>
  </BrowserRouter>
));

export { Routes };
