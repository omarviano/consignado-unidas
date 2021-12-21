import React from 'react';

import * as Styled from './styles';

const LoanDetails: React.FC = () => (
  <Styled.ContentTextInformation>
    <Styled.TextInformation>
      O valor da parcela será descontado em folha
    </Styled.TextInformation>

    <Styled.TextInformation>
      Os valores são estimados e podem mudar de acordo com a análise de crédito
      que for realizada. O empréstimo será contratado apenas quando você de fato
      clicar no botão “solicitar empréstimo”.
    </Styled.TextInformation>

    <Styled.TextInformation>
      Você ainda terá chance de rever a proposta antes de aceitar.
    </Styled.TextInformation>
  </Styled.ContentTextInformation>
);

export { LoanDetails };
