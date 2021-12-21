import { FC, useCallback } from 'react';
import { formatValue } from 'utils/formatValue';
import { Slider } from 'components/Slider';

import { useSimulateLoan } from 'hooks/simulate';
import { DataSimulateProps, SimulateLoanProps } from 'interface/simulate';
import { useSimulateLoanRealTime } from 'hooks/simulateRealtime';
import * as Styled from './styles';
import { LoanDetails } from '../LoanDetails';

const CardSimulateLoan: FC = () => {
  const {
    valueSliderSimulate,
    addValueSliderSimulate,
    dataMargin,
    addDataSimulateLoan,
  } = useSimulateLoanRealTime();

  const { simulateLoan, resetModalActive } = useSimulateLoan();

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      addDataSimulateLoan({} as DataSimulateProps);
      addValueSliderSimulate(newValue as number);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleSubmit = useCallback(async () => {
    const data: SimulateLoanProps = {
      value: valueSliderSimulate,
      admissionDate: dataMargin[0].admissionDate,
      marginAvailableValue: dataMargin[0].availableValue,
      marginTotalValue: dataMargin[0].totalValue,
      relationship: dataMargin[0].situation,
    };

    await simulateLoan(data);
    resetModalActive();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMargin, valueSliderSimulate]);

  return (
    <Styled.Container>
      <Styled.ContentSlider>
        <Styled.TextContractProposal variant="h2">
          Proposta de contratos para o empréstimo no valor de
        </Styled.TextContractProposal>
        <Styled.TextValueSlider>
          {formatValue(valueSliderSimulate)}
        </Styled.TextValueSlider>
        <Slider
          value={valueSliderSimulate}
          size="medium"
          onChange={handleSliderChange}
          onChangeCommitted={handleSubmit}
          step={100}
          min={1000}
          max={dataMargin[0]?.creditLimit}
          valueLabelDisplay="auto"
        />
      </Styled.ContentSlider>

      <Styled.ContentTextInformation>
        <LoanDetails />
      </Styled.ContentTextInformation>
    </Styled.Container>
  );
};

export { CardSimulateLoan };
