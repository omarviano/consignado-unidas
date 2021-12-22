import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';

import Logo from 'assets/images/logo.png';

import { Modal } from 'components/Modal';
import { useAuth } from 'hooks/auth';
import { getToken } from 'hooks/auth/storage';
import useModal from 'hooks/modal';
import { RoutingPath } from 'utils/routing';
import { clearStorage } from 'utils/storage';

import { LayoutProps } from './props';
import * as Styled from './styles';

const Layout: React.FC<LayoutProps> = ({ children, containerStyles }) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const { open, toggle } = useModal();
  const { isAuthenticated, signOut } = useAuth();

  const clearSessionStorage = () => {
    clearStorage();
    signOut();
    history.push(RoutingPath.LOGIN);
  };

  const toggleMenu = () => {
    setMenuOpen(state => !state);
  };

  const handleClickLogout = () => {
    setMenuOpen(false);
    toggle();
  };

  return (
    <>
      <Styled.Page>
        <Styled.Header>
          <Link to="/">
            <Styled.Logo src={Logo} alt="Unidas" />
          </Link>

          {isAuthenticated && (
            <>
              <Styled.Nav>
                <NavLink to={RoutingPath.LOGGEDAREA}>
                  Simular Empréstimo
                </NavLink>
                <NavLink to={RoutingPath.CONTRACTS}>Meus Contratos</NavLink>
                <NavLink to={RoutingPath.FAQ}>Dúvidas Frequentes</NavLink>
              </Styled.Nav>

              <Styled.UserOptionsContainer>
                <Styled.UserLogged onClick={toggleMenu}>
                  <Styled.Username>{getToken()?.user.name}</Styled.Username>
                  <KeyboardArrowDown />
                </Styled.UserLogged>

                <Styled.Options menuOpen={menuOpen}>
                  <Link to={RoutingPath.CHANGE_PASSWORD} onClick={toggleMenu}>
                    Alterar minha senha
                  </Link>

                  <Styled.LogoutButton
                    type="button"
                    onClick={handleClickLogout}
                  >
                    Sair
                  </Styled.LogoutButton>
                </Styled.Options>
              </Styled.UserOptionsContainer>
            </>
          )}

          {!isAuthenticated ? (
            <Link to={RoutingPath.LOGIN} className="sign-in">
              Entrar
            </Link>
          ) : (
            <Styled.MenuButton>
              <MenuIcon />
            </Styled.MenuButton>
          )}
        </Styled.Header>

        <Styled.Container style={containerStyles}>{children}</Styled.Container>

        <Styled.Footer>
          <Link to={RoutingPath.PRIVACY}>Política de privacidade</Link>

          <Styled.FooterText className="privacy privacy-alt">
            Somos correspondentes bancários da Mova
          </Styled.FooterText>

          <Styled.About>
            <Styled.AboutText>
              O site consignado.unidas.com.br pertence e é operado pela Unidas,
              inscrita no CNPJ 10.215.988/0001-60, com sede à Avenida Raja
              Gabaglia, nº 1.781, 12º andar, Luxemburgo, Belo Horizonte/MG. A
            </Styled.AboutText>

            <Styled.AboutText>
              Unidas não é uma instituição financeira e não realiza operações de
              crédito diretamente. A Unidas atua como correspondente bancário da
              Mova Sociedade de Empréstimo entre Pessoas S.A. (CNPJ
              33.959.738/0001-30) e segue as diretrizes do Banco Central do
              Brasil, nos termos da Resolução nº. 3.954, de 24 de fevereiro de
              2011.
            </Styled.AboutText>
          </Styled.About>

          <Styled.FooterBox>
            <Styled.FooterText className="privacy">
              Somos correspondentes bancários da Mova
            </Styled.FooterText>
            <Styled.FooterText className="copyright">
              &copy; 2021 UNIDAS - Todos os direitos reservados.
            </Styled.FooterText>
          </Styled.FooterBox>
        </Styled.Footer>
      </Styled.Page>

      <Modal open={open} onClose={toggle}>
        <Styled.Content>
          <Styled.Title variant="h2">Tem certeza que deseja sair?</Styled.Title>

          <Styled.DivButtons>
            <Styled.ButtonYes
              color="primary"
              variant="contained"
              onClick={clearSessionStorage}
            >
              Sim
            </Styled.ButtonYes>

            <Styled.ButtonNo
              color="primary"
              variant="outlined"
              onClick={() => toggle()}
            >
              Não
            </Styled.ButtonNo>
          </Styled.DivButtons>
        </Styled.Content>
      </Modal>
    </>
  );
};

export { Layout };
