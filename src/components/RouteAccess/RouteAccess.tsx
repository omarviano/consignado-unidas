import { useAuth } from 'hooks/auth';
import { FC, Fragment, memo, useEffect, useMemo, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { RoutingPath } from 'utils/routing';

import { RouteAccessProps } from './props';

import * as Styled from './styles';

const RouteAccess: FC<RouteAccessProps> = memo(props => {
  const { children, typesOfAccess } = props;
  const { isAuthenticated, isAuthenticating } = useAuth();
  const loadRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticating) {
      loadRef.current = true;
    }
    return () => {
      loadRef.current = false;
    };
  }, [isAuthenticating]);

  const pageToRedirect = useMemo(() => {
    if (typesOfAccess === 'auth' && !isAuthenticated) return RoutingPath.LOGIN;
    if (typesOfAccess === 'guest' && isAuthenticated)
      return RoutingPath.LOGGEDAREA;

    return null;
  }, [isAuthenticated, typesOfAccess]);

  if (pageToRedirect) return <Redirect to={pageToRedirect} />;

  return (
    <Fragment>
      <Styled.Container>{children}</Styled.Container>
    </Fragment>
  );
});

export { RouteAccess };
