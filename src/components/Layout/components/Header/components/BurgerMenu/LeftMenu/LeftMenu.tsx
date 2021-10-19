import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useHeaderMobile } from 'hooks/headerMobile';
import { RoutingPath } from 'utils/routing';

import { LeftMenuProps } from './props';
import * as Styled from './styles';

const LeftMenu: FC<LeftMenuProps> = props => {
  const { open } = props;
  const { toggle } = useHeaderMobile();
  const { pathname } = useLocation();

  return (
    <Styled.ContainerUl open={open}>
      <Styled.Items
        to={RoutingPath.LOGGEDAREA}
        active={RoutingPath.LOGGEDAREA === pathname}
        onClick={() => toggle()}
      >
        Início
      </Styled.Items>
    </Styled.ContainerUl>
  );
};

export { LeftMenu };
