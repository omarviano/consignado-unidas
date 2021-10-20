import { FC, memo, ReactNode } from 'react';

import { AuthProvider } from './auth';
import { HeaderMobileProvider } from './headerMobile';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = memo(props => {
  const { children } = props;

  return (
    <AuthProvider>
      <HeaderMobileProvider>{children}</HeaderMobileProvider>
    </AuthProvider>
  );
});

export { AppProvider };
