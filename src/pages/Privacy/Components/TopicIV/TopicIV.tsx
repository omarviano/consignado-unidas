import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicIV: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      IV. PARA QUAIS FINALIDADES TRATAMOS OS SEUS DADOS?
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      A Unidas e a Embracon, em conjunto, poderão utilizar seus dados pessoais
      para atender a finalidades legítimas, específicas e determinadas, conforme
      informamos a seguir:
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>• Oferecimento de serviços de Consórcio:</Styled.Strong>{' '}
      Tratando-se da parceria da Unidas com a Embracon, nós poderemos utilizar
      os seus dados de identificação e qualificação, fornecidos por você nos
      cadastros online da Unidas, para permitir a realização e facilitação de
      diligências pré-contratuais por parte da Embracon, no intuito de
      concretizar o serviço de consórcio idealizado pela parceria e que poderá
      ser ofertado a você, durante o contato que mantiver com as empresas
      parceiras. A gestão do consórcio e das ofertas será realizada pela
      Embracon, mediante a identificação dos clientes derivada do cadastro
      Unidas e por esta fornecidas à Embracon.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>• Contato e comunicações comerciais:</Styled.Strong> no
      momento do seu cadastro, caso você nos autorize, poderemos utilizar os
      seus dados para que possamos direcionar nossas ofertas de produtos,
      serviços e oportunidades, bem como para divulgar o lançamento de novos
      serviços, sempre relacionados às nossas atividades na Unidas, como o
      aluguel de carros e a venda de seminovos, e de nosso parceiro comercial
      Embracon, que podem ser de seu interesse. Para isso, adotamos o envio
      notícias e promoções via e-mail e telefone. Você poderá a qualquer momento
      optar pela descontinuidade do recebimento de nossas ofertas, ou ainda das
      ofertas de nossos parceiros comerciais, por meio do e-mail{' '}
      <Styled.Email href="mailto:dpo@unidas.com.br">
        dpo@unidas.com.br
      </Styled.Email>
      .
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>
        • Cumprimento de obrigações legais e regulatórias –
      </Styled.Strong>{' '}
      Os dados coletados poderão ser utilizados para garantir o cumprimento de
      obrigações legais ou regulatórias às quais a Unidas e a Embracon estão
      submetidas.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>
        • Finalidades administrativas, judiciais ou arbitrais –
      </Styled.Strong>{' '}
      Nós podemos utilizar os dados coletados para exercer nossos direitos no
      âmbito de um conflito administrativo, judicial ou ainda arbitral, sempre
      em conformidade com a legislação brasileira.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicIV };
