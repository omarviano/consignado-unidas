import { useModalLogout } from 'components/Layout/components/ModalLogout/context';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { RoutingPath } from 'utils/routing';

import { LeftMenuProps } from './props';
import * as Styled from './styles';

const LeftMenu: FC<LeftMenuProps> = props => {
  const { open } = props;
  const { pathname } = useLocation();
  const { toggleModal } = useModalLogout();

  return (
    <Styled.ContainerUl open={open}>
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
      <Styled.Items to="/" active={false}>
        Ajuda
      </Styled.Items>
      <Styled.Items to={RoutingPath.FAQ} active={RoutingPath.FAQ === pathname}>
        FAQ
      </Styled.Items>
      <Styled.ItemCustom onClick={() => toggleModal()}>Sair</Styled.ItemCustom>
    </Styled.ContainerUl>
  );
};

export { LeftMenu };
