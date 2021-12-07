import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicIV: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      IV. PARA QUAIS FINALIDADES TRATAMOS OS SEUS DADOS?
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      A Unidas, a Consignet e a Mova, em conjunto, poderão utilizar seus dados
      pessoais para atender a finalidades legítimas, específicas e determinadas,
      conforme informamos a seguir:
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>
        • Oferecimento de serviços de crédito consignado:
      </Styled.Strong>
      Tratando-se da parceria da Unidas, da Consignet e da Mova, nós poderemos
      utilizar os seus dados de identificação e qualificação, fornecidos por
      você nos cadastros online da Unidas, para permitir a realização e
      facilitação de diligências pré-contratuais por parte da Mova, no intuito
      de concretizar o serviço de crédito consignado idealizado pela parceria e
      que poderá ser ofertado a você durante o contato que mantiver com as
      empresas parceiras. A gestão do crédito consignado e das ofertas serão
      realizadas pela Unidas por meio de ferramentas de gestão oferecidas pela
      Consignet, mediante a identificação dos clientes derivados do cadastro e
      por esta fornecida à Consignet e à Mova.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>• Contato e comunicações comerciais:</Styled.Strong> No
      momento do seu cadastro, poderemos utilizar os seus dados para que
      possamos direcionar nossas ofertas de produtos, serviços e oportunidades,
      bem como para divulgar o lançamento de novos serviços, sempre relacionados
      às nossas atividades na Unidas, como o aluguel de carros e a venda de
      seminovos, e de nossos parceiros comerciais Consignet e Mova, que podem
      ser de seu interesse. Para isso, adotamos o envio notícias e promoções via
      e-mail e telefone. Você poderá a qualquer momento optar pela
      descontinuidade do recebimento de nossas ofertas, ou ainda das ofertas de
      nossos parceiros comerciais, por meio do e-mail{' '}
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
      obrigações legais ou regulatórias às quais a Unidas, a Consignet e a Mova
      estão submetidas, nos termos da legislação aplicável.
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
