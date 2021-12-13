import React from 'react';
import { MailOutline } from '@mui/icons-material';
import { getToken } from 'hooks/auth/storage';

import * as Styled from './styles';

const ReleasedCredit: React.FC = () => (
  <Styled.DataCard>
    <MailOutline color="secondary" />

    <Styled.HelloUsername>Olá {getToken()?.user.name}!</Styled.HelloUsername>

    <Styled.ReleasedCredit>
      Temos uma ótima notícia!
      <br />O seu crédito no valor de <strong>R$30.000,00</strong> foi{' '}
      <strong className="released">LIBERADO</strong>!
    </Styled.ReleasedCredit>

    <Styled.ReleasedCredit>
      Ele já está disponível na sua conta:
    </Styled.ReleasedCredit>

    <Styled.BankData>
      Banco : Santander
      <br />
      Agência : xxxx
      <br />
      C/C: xxxxxx-x
    </Styled.BankData>
  </Styled.DataCard>
);

export { ReleasedCredit };
