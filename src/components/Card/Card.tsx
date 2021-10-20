import { FC, memo } from 'react';

import * as Styled from './styles';

const Card: FC = memo(props => {
  const { children } = props;

  return <Styled.Container>{children}</Styled.Container>;
});

export { Card };
