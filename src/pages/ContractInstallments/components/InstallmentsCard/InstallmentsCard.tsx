import React from 'react';

import { InstallmentsCardProps } from './props';
import * as Styled from './styles';

const InstallmentsCard: React.FC<InstallmentsCardProps> = ({
  data,
  totalInstallments,
}) => (
  <Styled.Container data-testid="installment-card">
    <Styled.DataContainer>
      <Styled.Installment>
        Parcela - {data?.installment} de {totalInstallments}
      </Styled.Installment>

      <Styled.DataBox>
        <Styled.Data>
          <Styled.DataLabel>Vencimento da folha</Styled.DataLabel>
          <Styled.DataValue>{data?.dateSheet}</Styled.DataValue>
        </Styled.Data>

        <Styled.Data>
          <Styled.DataLabel>Valor da parcela</Styled.DataLabel>
          <Styled.DataValue>{data?.installmentsValue}</Styled.DataValue>
        </Styled.Data>
      </Styled.DataBox>
    </Styled.DataContainer>
    <Styled.Status>{data?.installmentStatus}</Styled.Status>
  </Styled.Container>
);

export { InstallmentsCard };
