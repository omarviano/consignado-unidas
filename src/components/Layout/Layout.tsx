import { FC, memo } from 'react';

import { Header } from './components/Header';
import { ModalLogout } from './components/ModalLogout';
import { ModalLogoutProvider } from './components/ModalLogout/context';
import { LayoutProps } from './props';
import * as Styled from './styles';

const Layout: FC<LayoutProps> = memo(props => {
  const { children } = props;

  return (
    <ModalLogoutProvider>
      <Styled.Main>
        <Header />
        <Styled.MainContent>{children}</Styled.MainContent>
      </Styled.Main>
      <ModalLogout />
    </ModalLogoutProvider>
  );
});

export { Layout };
