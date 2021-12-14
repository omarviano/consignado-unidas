import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicII: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      II. COMO COLETAMOS SEUS DADOS PESSOAIS?
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Os dados pessoais que coletamos sobre você podem ter sido obtidos
      diretamente de você ou automaticamente pela Unidas, pela Consignet e/ou
      pela Mova:
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>• Informações fornecidas por você</Styled.Strong> – Durante
      o seu relacionamento conosco e no âmbito da parceria entre a Unidas, a
      Consignet e a Mova, nós coletaremos os dados fornecidos diretamente por
      você, por meio dos cadastros que solicitaremos que você preencha quando
      acessar o Portal e estiver à procura dos nossos produtos e serviços de
      crédito consignado.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      <Styled.Strong>
        • Informações coletadas de forma automática –
      </Styled.Strong>{' '}
      - Nós podemos também coletar informações sobre a sua navegação e
      utilização do Portal, de modo automático. Tal coleta é realizada por meio
      do uso de cookies e outras tecnologias análogas, tudo de acordo com o
      permitido em lei, sendo que no seu primeiro acesso ao Portal lhe será
      questionado sobre a aceitação ou não destes cookies. Traremos abaixo uma
      seção específica sobre os cookies para conferir a você um maior nível de
      detalhamento
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicII };
