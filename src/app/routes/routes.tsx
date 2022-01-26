import { FC, memo } from 'react';
import { Route as ReactDOMRoute } from 'react-router-dom';

import LoggedArea from 'pages/LoggedArea';
import Login from 'pages/Login';
import Registration from 'pages/Registration';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import AccountConfirmation from 'pages/AccountConfirmation';
import Accompaniment from 'pages/Accompaniment';
import ChangePassword from 'pages/ChangePassword';
import Contracts from 'pages/Contracts';
import SimulateLoan from 'pages/SimulateLoan';
import FAQ from 'pages/FAQ';
import Privacy from 'pages/Privacy';
import ContractInstallments from 'pages/ContractInstallments';

import { RoutingPath } from 'utils/routing';
import { SimulateLoanRealTimeProvider } from 'hooks/simulateRealtime';

import Route from './Route';

const Routes: FC = memo(() => (
  <>
    <ReactDOMRoute path={RoutingPath.LOGIN} component={Login} exact />

    <Route
      path={RoutingPath.REGISTRATION}
      component={Registration}
      typesOfAccess="guest"
    />

    <Route
      path={RoutingPath.FORGOT_PASSWORD}
      component={ForgotPassword}
      typesOfAccess="guest"
    />

    <Route
      path={RoutingPath.RESET_PASSWORD}
      component={ResetPassword}
      typesOfAccess="guest"
    />

    <Route
      path={RoutingPath.ACCOUNT_CONFIRMATION}
      component={AccountConfirmation}
      typesOfAccess="guest"
    />

    <Route
      path={RoutingPath.ACCOMPANIMENT}
      component={Accompaniment}
      typesOfAccess="auth"
    />

    <Route
      path={RoutingPath.CHANGE_PASSWORD}
      component={ChangePassword}
      typesOfAccess="auth"
    />

    <Route path={RoutingPath.FAQ} component={FAQ} typesOfAccess="auth" />

    <Route
      path={RoutingPath.CONTRACTS}
      component={Contracts}
      typesOfAccess="auth"
      exact
    />

    <Route
      path={RoutingPath.CONTRACT_INSTALLMENTS}
      component={ContractInstallments}
      typesOfAccess="auth"
    />

    <ReactDOMRoute path={RoutingPath.PRIVACY} component={Privacy} />

    <SimulateLoanRealTimeProvider>
      <Route
        path={RoutingPath.LOGGEDAREA}
        component={LoggedArea}
        typesOfAccess="auth"
      />
      <Route
        path={RoutingPath.SIMULATE_LOAN}
        component={SimulateLoan}
        typesOfAccess="auth"
      />
    </SimulateLoanRealTimeProvider>
  </>
));

export { Routes };
