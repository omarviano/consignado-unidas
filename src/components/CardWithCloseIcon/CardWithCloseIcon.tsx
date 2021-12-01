import React from 'react';
import { Close } from '@mui/icons-material';

import * as Styled from './styles';
import { CardWithCloseIconProps } from './props';

const CardWithCloseIcon: React.FC<CardWithCloseIconProps> = ({
  onClickCloseButton,
  children,
}) => (
  <Styled.Container>
    <Styled.CloseButton onClick={onClickCloseButton}>
      <Close fontSize="medium" color="primary" />
    </Styled.CloseButton>
    {children}
  </Styled.Container>
);

export { CardWithCloseIcon };
