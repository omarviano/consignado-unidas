import React from 'react';

import * as Styled from './styles';

const Error500: React.FC = () => (
  <Styled.Container id="erro500" data-testid="erro500">
    <Styled.Title>ERROR 500</Styled.Title>
    <Styled.SubTitle>OPS! Houve um erro interno do servidor</Styled.SubTitle>
  </Styled.Container>
);

export { Error500 };
