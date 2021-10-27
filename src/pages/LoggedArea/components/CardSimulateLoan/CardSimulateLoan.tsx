import { Formik } from 'components/Formik';
import { useMarginUser } from 'pages/LoggedArea/context';
import { SimulateLoanProps } from 'pages/LoggedArea/context/props';
import { FC, memo, useCallback, useState } from 'react';

import { formatValue } from 'utils/formatValue';
import * as Styled from './styles';

const CardSimulateLoan: FC = memo(() => {
  const { dataMargin, simulateLoan, resetModalActive } = useMarginUser();
  const [value, setValue] = useState(5000);

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const data: SimulateLoanProps = {
      value,
      admissionDate: dataMargin[0].admissionDate,
      marginAvailableValue: dataMargin[0].availableValue,
      marginTotalValue: dataMargin[0].totalValue,
      relationship: dataMargin[0].relationship,
    };

    await simulateLoan(data);
    resetModalActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMargin, value]);

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      <Styled.Container>
        <Styled.TextWhatValue>
          Qual valor você deseja contratar?
        </Styled.TextWhatValue>
        <Styled.TextInfomation>
          Lembramos, que neste momento você não está contratando nenhum
          empréstimo e realizando apenas uma simulação. O aceite será feito em
          etapas posteriores.
        </Styled.TextInfomation>
        <Styled.TextValueSlider>{formatValue(value)}</Styled.TextValueSlider>
        <Styled.Slider
          value={value}
          size="medium"
          onChange={handleSliderChange}
          step={100}
          min={5000}
          max={100000}
          valueLabelDisplay="auto"
        />
        <Styled.ButtonSimluteLoan
          type="submit"
          variant="contained"
          color="primary"
        >
          Simular Empréstimo
        </Styled.ButtonSimluteLoan>
      </Styled.Container>
    </Formik>
  );
});

export { CardSimulateLoan };
