import { FC, Fragment } from 'react';
import { getToken } from 'hooks/auth/storage';

import { BurgerMenu } from './components/BurgerMenu';
import * as Styled from './styles';

const Header: FC = () => (
  <Fragment>
    <Styled.Container>
      <Styled.Content maxWidth={false}>
        <BurgerMenu />
        <Styled.TextUserLogged variant="h4">
          {getToken()?.user.name}
        </Styled.TextUserLogged>
      </Styled.Content>
    </Styled.Container>
  </Fragment>
);

export { Header };
