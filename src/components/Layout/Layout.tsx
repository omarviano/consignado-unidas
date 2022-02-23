import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';

import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';

import Logo from 'assets/images/logo.png';

import { SessionModal } from 'components/SessionModal';
import { Modal } from 'components/Modal';
import { useAuth } from 'hooks/auth';
import { getToken } from 'hooks/auth/storage';
import useModal from 'hooks/useModal';
import { RoutingPath } from 'utils/routing';
import { clearStorage } from 'utils/storage';
import { useHeaderMobile } from 'hooks/headerMobile';
import version from 'utils/getVersion';
import { LeftMenu } from './LeftMenu';

import { LayoutProps } from './props';
import * as Styled from './styles';

const Layout: React.FC<LayoutProps> = ({ children, containerStyles }) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: menuLeftOpen, toggle: toggleMenuLeftOpen } = useHeaderMobile();

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
              <Styled.Nav data-testid="menu">
                <NavLink to={RoutingPath.LOGGEDAREA}>
                  Simular Empréstimo
                </NavLink>
                <NavLink to={RoutingPath.CONTRACTS}>Meus Contratos</NavLink>
                <NavLink to={RoutingPath.FAQ}>Dúvidas Frequentes</NavLink>
              </Styled.Nav>

              <Styled.UserOptionsContainer data-testid="menu-mobile">
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
                    data-testid="sign-out-button"
                  >
                    Sair
                  </Styled.LogoutButton>
                </Styled.Options>
              </Styled.UserOptionsContainer>
            </>
          )}

          {!isAuthenticated ? (
            <Link
              to={RoutingPath.LOGIN}
              className="sign-in"
              data-testid="sign-in"
            >
              Entrar
            </Link>
          ) : (
            <Styled.MenuButton data-testid="menu-button">
              <MenuIcon onClick={toggleMenuLeftOpen} />
            </Styled.MenuButton>
          )}
        </Styled.Header>

        <LeftMenu
          open={menuLeftOpen}
          toggleModal={toggle}
          toggleMenuLeft={toggleMenuLeftOpen}
        />

        <Styled.DivOpacity open={menuLeftOpen} onClick={toggleMenuLeftOpen} />

        <Styled.Container style={containerStyles}>{children}</Styled.Container>

        <Styled.FooterContainer>
          <Styled.Footer>
            <Styled.FooterContent>
              <Link to={RoutingPath.PRIVACY}>Política de privacidade</Link>

              <Styled.Version>Versão {version}</Styled.Version>
            </Styled.FooterContent>

            <Styled.FooterContent>
              <Styled.About>
                <Styled.AboutText>
                  O site consignado.unidas.com.br pertence e é operado pela
                  Unidas, inscrita no CNPJ 10.215.988/0001-60, com sede na
                  Avenida Raja Gabaglia, nº 1.781, 12º andar, Luxemburgo, Belo
                  Horizonte/MG. A
                </Styled.AboutText>

                <Styled.AboutText>
                  Unidas não é uma instituição financeira e não realiza
                  operações de crédito diretamente. A Unidas atua como
                  correspondente bancário da Mova Sociedade de Empréstimo entre
                  Pessoas S.A. (CNPJ 33.959.738/0001-30) e segue as diretrizes
                  do Banco Central do Brasil, nos termos da Resolução nº. 3.954,
                  de 24 de fevereiro de 2011.
                </Styled.AboutText>
              </Styled.About>
            </Styled.FooterContent>

            <Styled.Copyright>
              <Styled.CopyrightText>
                Somos correspondentes bancários da Mova
              </Styled.CopyrightText>

              <Styled.CopyrightText>
                © 2021 UNIDAS - Todos os direitos reservados.
              </Styled.CopyrightText>
            </Styled.Copyright>
          </Styled.Footer>
        </Styled.FooterContainer>
      </Styled.Page>

      <Modal open={open} onClose={toggle}>
        <Styled.Content data-testid="sign-out-modal">
          <Styled.Title variant="h2">Tem certeza que deseja sair?</Styled.Title>

          <Styled.DivButtons>
            <Styled.ButtonYes
              color="primary"
              variant="contained"
              onClick={clearSessionStorage}
              data-testid="sign-out-confirm-button"
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

      {isAuthenticated && <SessionModal />}
    </>
  );
};

export { Layout };
