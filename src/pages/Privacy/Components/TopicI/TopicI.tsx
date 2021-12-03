import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicI: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      I. QUAIS DADOS PESSOAIS PODERÃO SER COLETADOS?
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Para disponibilizarmos a você os melhores produtos e condições, e garantir
      que estes sejam ofertados da forma correta, precisaremos obter algumas
      informações pessoais, as quais poderão ser fornecidas ativamente por você
      por meio do seu cadastro realizado no Site. Por isso, coletaremos, em
      essência, seus dados cadastrais, ou seja, nome, CEP, cidade, estado,
      telefone e e-mail.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Em algumas situações, poderemos também coletar dados comportamentais e de
      conexão de forma automática, a partir do seu acesso e navegação no Site,
      sendo estes as características do seu dispositivo de acesso, do seu
      navegador, o IP (com data e hora), origem do IP, informações sobre cliques
      e páginas acessadas.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicI };
