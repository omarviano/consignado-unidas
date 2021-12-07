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
      por meio do seu cadastro realizado no Portal. Por isso, coletaremos, em
      essência, seus dados cadastrais, ou seja, nome, data de nascimento, CPF,
      endereço, telefone, e-mail, conta bancária, bem como dados de sua relação
      com empresas do grupo Unidas, incluindo data de admissão, vínculo
      contratual, situação funcional, margem consignável, salário e número de
      matrícula.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Em algumas situações, poderemos também coletar dados comportamentais e de
      conexão de forma automática, a partir do seu acesso e navegação no Portal,
      sendo estes as características do seu dispositivo de acesso, do seu
      navegador, o IP (com data e hora), origem do IP, informações sobre cliques
      e páginas acessadas.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicI };
