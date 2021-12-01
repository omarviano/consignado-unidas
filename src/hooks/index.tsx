import { FC, memo, ReactNode } from 'react';

import { AuthProvider } from './auth';
import { HeaderMobileProvider } from './headerMobile';
import { SessionProvider } from './session';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = memo(props => {
  const { children } = props;

  return (
    <AuthProvider>
      <SessionProvider>
        <HeaderMobileProvider>{children}</HeaderMobileProvider>
      </SessionProvider>
    </AuthProvider>
  );
});

export { AppProvider };
