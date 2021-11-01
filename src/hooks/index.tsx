import { FC, memo, ReactNode } from 'react';

import { AuthProvider } from './auth';
import { HeaderMobileProvider } from './headerMobile';
import { SessionProvider } from './session';
import { SimulateLoanRealTimeProvider } from './simulateRealtime';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = memo(props => {
  const { children } = props;

  return (
    <AuthProvider>
      <SessionProvider>
        <SimulateLoanRealTimeProvider>
          <HeaderMobileProvider>{children}</HeaderMobileProvider>
        </SimulateLoanRealTimeProvider>
      </SessionProvider>
    </AuthProvider>
  );
});

export { AppProvider };
