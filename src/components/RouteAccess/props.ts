import { ReactChildren, ReactNode } from 'react';

type RouteAccess = 'auth' | 'none' | 'guest';

export interface RouteAccessProps {
  children: ReactChildren | ReactNode;
  typesOfAccess: RouteAccess;
}
