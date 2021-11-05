import { FC, Fragment, useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getToken } from 'hooks/auth/storage';

import { RoutingPath } from 'utils/routing';

import { BurgerMenu } from './components/BurgerMenu';
import * as Styled from './styles';

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(state => !state);
  };

  return (
    <Fragment>
      <Styled.Container>
        <Styled.Content maxWidth={false}>
          <BurgerMenu />
          <Styled.UserLogged onClick={toggleMenu}>
            {getToken()?.user.name} <KeyboardArrowDown />
          </Styled.UserLogged>
        </Styled.Content>

        <Styled.Menu menuOpen={menuOpen}>
          <Link to={RoutingPath.CHANGE_PASSWORD} onClick={toggleMenu}>
            Alterar minha senha
          </Link>
        </Styled.Menu>
      </Styled.Container>
    </Fragment>
  );
};

export { Header };
