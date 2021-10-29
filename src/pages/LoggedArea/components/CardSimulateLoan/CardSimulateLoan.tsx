import { SliderThumb } from '@material-ui/core';
import { Formik } from 'components/Formik';
import { useSimulateLoan } from 'hooks/simulate';
import { SimulateLoanProps } from 'hooks/simulate/props';
import ImageSlider from 'assets/icons/slider.svg';
import { FC, memo, useCallback, useMemo, useState } from 'react';

import { formatValue } from 'utils/formatValue';
import * as Styled from './styles';

const CardSimulateLoan: FC = memo(() => {
  const { dataMargin, simulateLoan, resetModalActive, requestStatus } =
    useSimulateLoan();

  const [value, setValue] = useState(
    dataMargin[0]?.availableValue <= 0 ? 0 : 5000,
  );

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

  const disableSliderAndButton = useMemo(
    () => dataMargin[0]?.availableValue <= 0,
    [dataMargin],
  );

  const valueMin = useMemo(
    () => (dataMargin[0]?.availableValue <= 0 ? 0 : 5000),
    [dataMargin],
  );

  const valueMax = useMemo(
    () => (dataMargin[0]?.availableValue <= 0 ? 0 : 100000),
    [dataMargin],
  );

  type SliderComponentProps = React.HTMLAttributes<unknown>;

  function SliderThumbComponent(props: SliderComponentProps) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <Styled.Icon src={ImageSlider} alt="Imagem" />
      </SliderThumb>
    );
  }

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
        <Styled.TextValueSlider disabled={disableSliderAndButton}>
          {formatValue(value)}
        </Styled.TextValueSlider>
        <Styled.Slider
          value={value}
          components={{ Thumb: SliderThumbComponent }}
          size="medium"
          onChange={handleSliderChange}
          step={100}
          disabled={disableSliderAndButton}
          min={valueMin}
          max={valueMax}
          valueLabelDisplay="auto"
        />
        <Styled.ButtonSimluteLoan
          type="submit"
          variant="contained"
          disabled={disableSliderAndButton || requestStatus.loading}
          color="primary"
        >
          Simular Empréstimo
        </Styled.ButtonSimluteLoan>
      </Styled.Container>
    </Formik>
  );
});

export { CardSimulateLoan };
