import React from 'react';

import { PasswordRulesProps } from './props';
import * as Styled from './styles';

const PasswordRules: React.FC<PasswordRulesProps> = ({ containerStyles }) => (
  <Styled.Container style={containerStyles}>
    <Styled.Label>Sua senha deve incluir:</Styled.Label>

    <Styled.Rules>
      <Styled.Rule>No mínimo 8 caracteres</Styled.Rule>
      <Styled.Rule>Pelo menos 2 letras e 2 números</Styled.Rule>
      <Styled.Rule>Pelo menos 1 letra maiúscula</Styled.Rule>
    </Styled.Rules>
  </Styled.Container>
);

export { PasswordRules };
