import { Button } from 'components/Buttons/Button';
import React from 'react';

import { InstallmentCardProps } from './props';
import * as Styled from './styles';

const InstallmentCard: React.FC<InstallmentCardProps> = ({
  data,
  onSelect,
}) => (
  <Styled.Container>
    <Styled.NumberInstallments>
      {data.quantityFormatted} parcelas
    </Styled.NumberInstallments>

    <Styled.DataContainer>
      <Styled.Dt>Valor da parcela</Styled.Dt>
      <Styled.Dd blackColor>{data.valueFormatted}</Styled.Dd>

      <Styled.Dt>Juros</Styled.Dt>
      <Styled.Dd>{data.feesPerMonthFormatted}</Styled.Dd>

      <Styled.Dt>CET</Styled.Dt>
      <Styled.Dd>{data.effectiveCostPerYearFormatted}</Styled.Dd>
    </Styled.DataContainer>

    <Button type="button" onClick={() => onSelect(data.id)} variant="contained">
      Solicitar empréstimo
    </Button>
  </Styled.Container>
);

export { InstallmentCard };
