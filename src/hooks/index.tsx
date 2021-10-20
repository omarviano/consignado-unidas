import { FC, memo, ReactNode } from 'react';

import { AuthProvider } from './auth';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = memo(props => {
  const { children } = props;

  return <AuthProvider>{children}</AuthProvider>;
});

export { AppProvider };
