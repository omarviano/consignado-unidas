import React from 'react';
import { MailOutline } from '@mui/icons-material';

import { getToken } from 'hooks/auth/storage';
import { formatValue } from 'utils/formatValue';

import { ReleasedCreditProps } from './props';
import * as Styled from './styles';

const ReleasedCredit: React.FC<ReleasedCreditProps> = ({ data }) => (
  <Styled.DataCard data-testid="releasedCredit">
    <MailOutline color="secondary" />

    <Styled.HelloUsername>Olá {getToken()?.user.name}!</Styled.HelloUsername>

    <Styled.ReleasedCredit>
      Temos uma ótima notícia!
      <br />O seu crédito no valor de{' '}
      <strong>{data?.value ? formatValue(data.value) : '-'}</strong> foi{' '}
      <strong className="released" data-testid="releasedCreditText">
        LIBERADO
      </strong>
      !
    </Styled.ReleasedCredit>

    <Styled.ReleasedCredit>
      Ele já está disponível na sua conta:
    </Styled.ReleasedCredit>

    <Styled.BankData data-testid="bankData">
      Banco: {data?.bankingReferences?.bankDescription || '-'}
      <br />
      Agência: {data?.bankingReferences?.agency || '-'}
      <br />
      C/C:{' '}
      {data?.bankingReferences?.accountNumber && data?.bankingReferences?.digit
        ? `${
            data?.bankingReferences?.accountNumber
          }-${data?.bankingReferences?.digit.padStart(2, '0')}`
        : '-'}
    </Styled.BankData>
  </Styled.DataCard>
);

export { ReleasedCredit };
