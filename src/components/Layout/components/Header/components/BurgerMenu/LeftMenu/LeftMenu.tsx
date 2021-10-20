import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { RoutingPath } from 'utils/routing';

import { LeftMenuProps } from './props';
import * as Styled from './styles';

const LeftMenu: FC<LeftMenuProps> = props => {
  const { open } = props;
  const { pathname } = useLocation();

  return (
    <Styled.ContainerUl open={open}>
      <Styled.Items
        to={RoutingPath.LOGGEDAREA}
        active={RoutingPath.LOGGEDAREA === pathname}
      >
        Simular Empréstimo
      </Styled.Items>
      <Styled.Items to="/" active={false}>
        Meus Contratos
      </Styled.Items>
      <Styled.Items to="/" active={false}>
        Ajuda
      </Styled.Items>
      <Styled.Items to="/" active={false}>
        FAQ
      </Styled.Items>
      <Styled.Items to="/" active={false}>
        Sair
      </Styled.Items>
    </Styled.ContainerUl>
  );
};

export { LeftMenu };
