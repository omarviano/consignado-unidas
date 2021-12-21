import { FC } from 'react';
import { getToken } from 'hooks/auth/storage';
import { useLocation } from 'react-router-dom';
import { RoutingPath } from 'utils/routing';
import { Close } from '@mui/icons-material';
import { LeftMenuProps } from './props';
import * as Styled from './styles';

const LeftMenu: FC<LeftMenuProps> = props => {
  const { open, toggleModal, toggleMenuLeft } = props;
  const { pathname } = useLocation();

  const handleLogout = () => {
    toggleMenuLeft();
    toggleModal();
  };

  return (
    <Styled.ContainerUl open={open}>
      <Styled.CloseButton onClick={toggleMenuLeft}>
        <Close fontSize="medium" color="primary" />
      </Styled.CloseButton>

      <Styled.UserLogged>{getToken()?.user.name}</Styled.UserLogged>

      <Styled.Items
        to={RoutingPath.LOGGEDAREA}
        active={RoutingPath.LOGGEDAREA === pathname}
      >
        Simular Empréstimo
      </Styled.Items>
      <Styled.Items
        to={RoutingPath.CONTRACTS}
        active={RoutingPath.CONTRACTS === pathname}
      >
        Meus Contratos
      </Styled.Items>
      <Styled.Items to={RoutingPath.FAQ} active={RoutingPath.FAQ === pathname}>
        Ajuda
      </Styled.Items>
      <Styled.Items
        to={RoutingPath.CHANGE_PASSWORD}
        active={RoutingPath.CHANGE_PASSWORD === pathname}
      >
        Alterar Senha
      </Styled.Items>
      <Styled.ItemCustom onClick={handleLogout}>Sair</Styled.ItemCustom>
    </Styled.ContainerUl>
  );
};
export { LeftMenu };
