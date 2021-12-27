import React from 'react';

import { InstallmentCardProps } from './props';
import * as Styled from './styles';

const InstallmentCard: React.FC<InstallmentCardProps> = ({ data }) => (
  <Styled.Container>
    <Styled.NumberInstallments>
      {data[0].quantityFormatted} parcelas
    </Styled.NumberInstallments>

    <Styled.DataContainer>
      <Styled.Dt>Valor da parcela</Styled.Dt>
      <Styled.Dd blackColor>{data[0].valueFormatted}</Styled.Dd>

      <Styled.Dt>Juros</Styled.Dt>
      <Styled.Dd>{data[0].feesPerMonthFormatted}</Styled.Dd>

      <Styled.Dt>CET</Styled.Dt>
      <Styled.Dd>{data[0].effectiveCostPerYearFormatted}</Styled.Dd>
    </Styled.DataContainer>
  </Styled.Container>
);

export { InstallmentCard };
