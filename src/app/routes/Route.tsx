import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from 'hooks/auth';
import { RoutingPath } from 'utils/routing';

interface RouteProps extends ReactDOMRouteProps {
  typesOfAccess?: 'auth' | 'none' | 'guest';
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  typesOfAccess = 'none',
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (typesOfAccess === 'auth' && !isAuthenticated)
          return (
            <Redirect
              to={{
                pathname: RoutingPath.LOGIN,
                state: { from: location },
              }}
            />
          );

        if (typesOfAccess === 'guest' && isAuthenticated)
          return (
            <Redirect
              to={{
                pathname: RoutingPath.LOGGEDAREA,
                state: { from: location },
              }}
            />
          );

        if (typesOfAccess === 'none')
          return <Redirect to={RoutingPath.LOGGEDAREA} />;

        return <Component />;
      }}
    />
  );
};

export default Route;
