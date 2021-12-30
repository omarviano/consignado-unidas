import React from 'react';
import { MailOutline } from '@mui/icons-material';
import { getToken } from 'hooks/auth/storage';

import * as Styled from './styles';

const ContractSigning: React.FC = () => (
  <Styled.DataCard>
    <MailOutline color="secondary" />

    <Styled.HelloUserName>Olá {getToken()?.user.name}!</Styled.HelloUserName>

    <Styled.TextInformative>
      Nesse momento você receberá um email da{' '}
      <strong>
        <a href="mailto:contato@mova.vc">contato@mova.vc</a>
      </strong>{' '}
      no seu email {getToken()?.user.email} com as informação para você enviar
      os documentos necessários.
      <br />
      <br />
      Caso não envie os documentos,
      <strong>
        {' '}
        o empréstimo será cancelado e deverá realizar um novo empréstimo, ok?
      </strong>
    </Styled.TextInformative>
  </Styled.DataCard>
);

export { ContractSigning };
