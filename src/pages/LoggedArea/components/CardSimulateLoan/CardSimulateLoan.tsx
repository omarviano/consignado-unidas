import { FC, memo, useCallback, useState } from 'react';

import { formatValue } from 'utils/formatValue';
import * as Styled from './styles';

const CardSimulateLoan: FC = memo(() => {
  const [value, setValue] = useState(3000);

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
    },
    [],
  );

  return (
    <Styled.Container>
      <Styled.TextWhatValue>
        Qual valor você deseja contratar?
      </Styled.TextWhatValue>
      <Styled.TextInfomation>
        Lembramos, que neste momento você não está contratando nenhum empréstimo
        e realizando apenas uma simulação. O aceite será feito em etapas
        posteriores.
      </Styled.TextInfomation>
      <Styled.TextValueSlider>{formatValue(value)}</Styled.TextValueSlider>
      <Styled.Slider
        value={value}
        size="medium"
        onChange={handleSliderChange}
        step={100}
        min={3000}
        max={100000}
        valueLabelDisplay="auto"
      />
      <Styled.ButtonSimluteLoan variant="contained" color="primary">
        Simular Empréstimo
      </Styled.ButtonSimluteLoan>
    </Styled.Container>
  );
});

export { CardSimulateLoan };
