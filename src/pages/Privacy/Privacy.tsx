import { FC } from 'react';

import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { TopicI } from './Components/TopicI';
import { TopicII } from './Components/TopicII/TopicII';
import { TopicIII } from './Components/TopicIII';
import { TopicIV } from './Components/TopicIV';
import { TopicV } from './Components/TopicV';
import { TopicVI } from './Components/TopicVI';
import { TopicVII } from './Components/TopicVII';
import { TopicVIII } from './Components/TopicVIII';
import * as Styled from './styles';

const Privacy: FC = () => (
  <RouteAccess typesOfAccess="none">
    <Layout
      containerStyles={{
        maxWidth: '1120px',
        padding: '0 24px 60px 24px',
      }}
    >
      <Styled.Container>
        <Styled.TitlePage variant="h1">AVISO DE PRIVACIDADE</Styled.TitlePage>

        <Styled.InformativeTexts>
          A Unidas e a Embracon estão comprometidas em proteger a sua
          privacidade e seus dados pessoais. O intuito deste Aviso de
          Privacidade é ser transparente e esclarecer os limites do tratamento
          das suas informações pessoais coletadas em decorrência da prestação
          dos nossos serviços e da parceria Unidas e Embracon para a oferta e
          contratação de Consórcios, especialmente quando você interage conosco
          por meio do site www.consorcio.unidas.com.br (“Site”).
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Este documento ajudará você a entender quais informações são
          coletadas, por qual motivo as coletamos, se as compartilhamos e com
          quem, bem como informará os seus direitos relativos a estes dados e
          como exercê-los ou entendê-los melhor junto à Unidas e a Embracon.
        </Styled.InformativeTexts>

        <TopicI />

        <TopicII />

        <TopicIII />

        <TopicIV />

        <TopicV />

        <TopicVI />

        <TopicVII />

        <TopicVIII />
      </Styled.Container>
    </Layout>
  </RouteAccess>
);

export { Privacy };
