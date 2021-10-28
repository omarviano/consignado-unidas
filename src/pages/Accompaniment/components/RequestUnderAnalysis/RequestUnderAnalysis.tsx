import React from 'react';
import { MailOutline } from '@material-ui/icons';
import { getToken } from 'hooks/auth/storage';

import * as Styled from './styles';

const RequestUnderAnalysis: React.FC = () => (
  <Styled.DataCard>
    <MailOutline color="secondary" />

    <Styled.HelloUsername>Olá {getToken()?.user.name}!</Styled.HelloUsername>

    <Styled.RequestUnderAnalysis>
      Sua solicitação está sendo analisada.{' '}
      <b>
        Assim que tivermos a resposta,
        <br /> entraremos em contato por e-mail e por aqui
      </b>
      . Qualquer dúvida, entre <br />
      em contato com o RH da empresa.
    </Styled.RequestUnderAnalysis>
  </Styled.DataCard>
);

export { RequestUnderAnalysis };
