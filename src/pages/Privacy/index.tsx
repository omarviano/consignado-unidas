import { FC } from 'react';

import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from 'hooks/appInsights';
import { TopicI } from './Components/TopicI';
import { TopicII } from './Components/TopicII/TopicII';
import { TopicIII } from './Components/TopicIII';
import { TopicIV } from './Components/TopicIV';
import { TopicV } from './Components/TopicV';
import { TopicVI } from './Components/TopicVI';
import { TopicVII } from './Components/TopicVII';
import { TopicVIII } from './Components/TopicVIII';
import { TopicIX } from './Components/TopicIX';

import * as Styled from './styles';

const Privacy: FC = () => (
  <RouteAccess typesOfAccess="none">
    <Layout
      containerStyles={{
        maxWidth: '1152px',
      }}
    >
      <Styled.Container>
        <Styled.TitlePage variant="h1">AVISO DE PRIVACIDADE</Styled.TitlePage>

        <Styled.InformativeTexts>
          A Unidas S.A. (CNPJ 04.437.534/0001-30, “Unidas”), a Consignet
          Sistemas Ltda (Consignet) (CNPJ 23.112.748/0001-81, “Consignet”) e a
          Mova Sociedade de Empréstimo entre Pessoas S.A. (CNPJ
          33.959.738/0001-30, “Mova”) estão comprometidas em proteger a sua
          privacidade e seus dados pessoais. O intuito deste Aviso de
          Privacidade é ser transparente e esclarecer os limites do tratamento
          das suas informações pessoais coletadas em decorrência da prestação
          dos nossos serviços e da parceria entre a Unidas, a Consignet e a Mova
          para a oferta e contratação de crédito consignado direcionado a
          colaboradores da Unidas, especialmente quando você interage conosco
          por meio do portal Unidas Consignado, disponível através do site{' '}
          <Styled.Link href="https://consignado.unidas.com.br/">
            https://consignado.unidas.com.br/
          </Styled.Link>{' '}
          (“Portal”).
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Este documento ajudará você a entender quais informações são
          coletadas, por qual motivo as coletamos, se as compartilhamos e com
          quem, bem como informará os seus direitos relativos a estes dados e
          como exercê-los ou entendê-los melhor junto à Unidas, à Consignet e à
          Mova.
        </Styled.InformativeTexts>

        <TopicI />

        <TopicII />

        <TopicIII />

        <TopicIV />

        <TopicV />

        <TopicVI />

        <TopicVII />

        <TopicVIII />

        <TopicIX />
      </Styled.Container>
    </Layout>
  </RouteAccess>
);

export default withAITracking(reactPlugin, Privacy, 'Privacy');
