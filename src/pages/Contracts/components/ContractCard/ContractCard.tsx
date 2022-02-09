import React from 'react';

import { ReactComponent as ConfirmIcon } from 'assets/icons/confirm.svg';

import { ContractCardProps } from './props';
import * as Styled from './styles';

const ContractCard: React.FC<ContractCardProps> = ({ data, onClickButton }) => (
  <Styled.Container data-testid="card-contract">
    <Styled.Status>
      <Styled.StatusLabel>Status:</Styled.StatusLabel>
      <Styled.StatusValue>
        <ConfirmIcon />
        {data.status}
      </Styled.StatusValue>
    </Styled.Status>

    <Styled.ContractNumber>
      Nº do contrato:
      <Styled.ContractNumberValue>{data.number}</Styled.ContractNumberValue>
    </Styled.ContractNumber>

    <Styled.Flex>
      <Styled.DataContainer>
        <Styled.DataLabel>Data do contrato</Styled.DataLabel>
        <Styled.DataValue>{data.date}</Styled.DataValue>

        <Styled.DataLabel>Nº de parcelas</Styled.DataLabel>
        <Styled.DataValue>{data.installments}</Styled.DataValue>
      </Styled.DataContainer>

      <Styled.DataContainer>
        <Styled.DataLabel>Valor da parcela</Styled.DataLabel>
        <Styled.DataValue>{data.installmentValue}</Styled.DataValue>

        <Styled.DataLabel>Valor do empréstimo</Styled.DataLabel>
        <Styled.DataValue>{data.value}</Styled.DataValue>
      </Styled.DataContainer>
    </Styled.Flex>

    <Styled.DetailsButton
      onClick={() => onClickButton(data.id)}
      data-testid="cards-button"
    >
      Mais detalhes {'>'}
    </Styled.DetailsButton>
  </Styled.Container>
);

export { ContractCard };
