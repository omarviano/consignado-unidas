import { FC } from 'react';
import { formatValue } from 'utils/formatValue';

import * as Styled from './styles';

const CardSimulateLoan: FC = props => {
  const { children } = props;

  return (
    <Styled.Container>
      <Styled.ContentSlider>
        <Styled.TextContractProposal variant="h2">
          Proposta de contratos para o empréstimo no valor de
        </Styled.TextContractProposal>
        <Styled.TextValueSlider>{formatValue(30000)}</Styled.TextValueSlider>
        <Styled.Slider />
      </Styled.ContentSlider>

      <Styled.ContentTextInformation>
        <Styled.TextInformation variant="h5">
          Os valores são estimados e podem mudar de acordo com a análise de
          crédito que for realizada. O empréstimo será contratado apenas quando
          você de fato clicar no botão <strong>“solicitar empréstimo”</strong>.
        </Styled.TextInformation>
      </Styled.ContentTextInformation>
    </Styled.Container>
  );
};

export { CardSimulateLoan };
