import { FC, memo } from 'react';
import { Header } from './components/Header';

import { LayoutProps } from './props';
import * as Styled from './styles';

const Layout: FC<LayoutProps> = memo(props => {
  const { children } = props;

  return (
    <Styled.Main>
      <Header />
      <Styled.MainContent>{children}</Styled.MainContent>
    </Styled.Main>
  );
});

export { Layout };
