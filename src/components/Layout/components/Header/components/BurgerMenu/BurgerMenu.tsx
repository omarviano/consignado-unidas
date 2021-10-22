import { FC, Fragment } from 'react';

import { useHeaderMobile } from 'hooks/headerMobile';
import { LeftMenu } from './LeftMenu';
import * as Styled from './styles';

const BurgerMenu: FC = () => {
  const { open, toggle } = useHeaderMobile();

  return (
    <Fragment>
      <Styled.Container open={open} onClick={toggle}>
        <div />
        <div />
        <div />
      </Styled.Container>
      <LeftMenu open={open} />
    </Fragment>
  );
};

export { BurgerMenu };
