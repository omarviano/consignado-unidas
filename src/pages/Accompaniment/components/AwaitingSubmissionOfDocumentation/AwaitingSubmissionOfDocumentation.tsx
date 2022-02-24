import React from 'react';
import { MailOutline } from '@mui/icons-material';
import { getToken } from 'hooks/auth/storage';

import * as Styled from './styles';

const AwaitingSubmissionOfDocumentation: React.FC = () => (
  <Styled.DataCard data-testid="awaitingSubmissionOfDocumentation">
    <MailOutline color="secondary" />

    <Styled.HelloUsername>Olá {getToken()?.user.name}!</Styled.HelloUsername>

    <Styled.RequestUnderAnalysis>
      Nesse momento você receberá um SMS do nosso parceiro bancário MOVA, para
      enviar os documentos necessários.
      <br />
      <div />
      Caso não envie os documentos,{' '}
      <b>
        o empréstimo será cancelado e deverá realizar um novo empréstimo, ok?
      </b>
    </Styled.RequestUnderAnalysis>
  </Styled.DataCard>
);

export { AwaitingSubmissionOfDocumentation };
