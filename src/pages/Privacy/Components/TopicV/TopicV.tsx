import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicV: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      V. COM QUEM PODEMOS COMPARTILHAR OS SEUS DADOS
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Para viabilizar a parceria entre Unidas, a Consignet e a Mova, os dados
      pessoais coletados pela Unidas por meio do Portal serão compartilhados com
      a Consignet, proprietária de ferramenta que integra os sistemas da Unidas
      e da Mova, a fim de realizar a gestão e controle da margem consignável dos
      colaboradores da Unidas; e com a própria Mova, instituição financeira
      especializada no oferecimento de crédito consignado.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      O tratamento conjunto dos seus dados pessoais pela Unidas, a Consignet e a
      Mova, em todos os casos, será realizado de forma a proteger a sua
      privacidade e em estrita observância às finalidades previamente informadas
      a você.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Os seus dados pessoais também poderão ser compartilhados com autoridades
      públicas para proteção dos nossos ou ainda dos seus interesses na hipótese
      de questionamentos administrativos, judiciais ou ainda, arbitrais. Esta
      possibilidade também é admitida mediante ordem judicial ou pelo
      requerimento de autoridades públicas que detenham competência legal para a
      requisição.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Poderemos compartilhar, ainda, os seus Dados Pessoais para apoio das
      nossas atividades, bem como de nossos parceiros comerciais, sendo que em
      qualquer hipótese de compartilhamento, sempre o faremos em estrita
      observância ao que dispõe a lei e respeitando todos os seus direitos.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicV };
