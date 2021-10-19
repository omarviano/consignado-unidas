import React from 'react';
import { ArrowRightAlt } from '@material-ui/icons';

import { ContinueButtonProps } from './props';
import * as Styled from './styles';

const ContinueButton: React.FC<ContinueButtonProps> = props => (
  <Styled.ContinueButton {...props}>
    Continuar <ArrowRightAlt />
  </Styled.ContinueButton>
);

export { ContinueButton };
