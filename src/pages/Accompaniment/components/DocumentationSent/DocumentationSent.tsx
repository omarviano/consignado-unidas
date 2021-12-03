import React from 'react';
import { MailOutline } from '@mui/icons-material';
import { getToken } from 'hooks/auth/storage';

import * as Styled from './styles';

const DocumentationSent: React.FC = () => (
  <Styled.DataCard>
    <MailOutline color="secondary" />

    <Styled.HelloUsername>Olá {getToken()?.user.name}!</Styled.HelloUsername>

    <Styled.RequestUnderAnalysis>
      Tudo certo! Recebemos a sua documentação. Ela está em análise. Em breve
      você será encaminhado para etapa de empréstimo aprovado.
    </Styled.RequestUnderAnalysis>
  </Styled.DataCard>
);

export { DocumentationSent };
