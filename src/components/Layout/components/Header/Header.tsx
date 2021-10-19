import { FC, Fragment } from 'react';

import { BurgerMenu } from './components/BurgerMenu';
import * as Styled from './styles';

const Header: FC = () => (
  <Fragment>
    <Styled.Container>
      <Styled.Content>
        <BurgerMenu />
        <h6>nome</h6>
      </Styled.Content>
    </Styled.Container>
  </Fragment>
);

export { Header };
