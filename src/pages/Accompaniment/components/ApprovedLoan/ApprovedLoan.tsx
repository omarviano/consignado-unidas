import { FC, useEffect, useMemo, useState } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { formatDate } from 'utils/formatDate';
import { formatValue } from 'utils/formatValue';
import { Table } from 'components/Table';

import { getToken } from 'hooks/auth/storage';
import { AccompanimentServices } from 'pages/Accompaniment/services/accompaniment.services';
import { LoanDataProps } from 'pages/Accompaniment/models/loanData';
import * as Styled from './styles';

const ApprovedLoan: FC = () => {
  const [loanData, setLoanData] = useState<LoanDataProps>();
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    AccompanimentServices.loanData().then(({ data }) => {
      const response = data.data as LoanDataProps;

      setLoanData(response);
    });
  }, []);

  useEffect(() => {
    const data = [
      {
        id: Math.random(),
        valueFormatted: formatValue(Number(loanData?.value)),
        effectiveCostPerYearFormatted: formatValue(
          Number(loanData?.effectiveCostPerYear),
        ),
        feesPerMonthFormatted: `${loanData?.feesPerMonth.toFixed(2)}%`,
        quantityFormatted: loanData?.quantity.toString().padStart(2, '0'),
      },
    ];

    setTableData(data);
  }, [loanData]);

  const columns = useMemo<GridColumns>(
    () => [
      {
        field: 'quantityFormatted',
        headerName: 'Parcelas',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
      },
      {
        field: 'valueFormatted',
        headerName: 'Valor da parcela',
        hideSortIcons: true,
        disableReorder: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'feesPerMonthFormatted',
        headerName: 'Juros',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'effectiveCostPerYearFormatted',
        headerName: 'CET',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
    ],
    [],
  );

  return (
    <Styled.Card>
      <Styled.LoanInformation variant="h2">
        Olá {getToken()?.user.name}! Tudo bem? Temos uma ótima notícia! <br /> A
        sua propósta de empréstimo foi{' '}
        <Styled.Approved>{loanData?.status && 'APROVADA'}</Styled.Approved>!
      </Styled.LoanInformation>

      <Styled.TotalAmountOfLoanRequested variant="h2">
        Valor total do empréstimo solicitado:{' '}
        <Styled.TextBlack>
          {formatValue(Number(loanData?.requestedAmount))}
        </Styled.TextBlack>
      </Styled.TotalAmountOfLoanRequested>

      <Styled.InstallmentDueDate variant="h2">
        Data de Vencimento da 1ª parcela:{' '}
        <Styled.TextBlack>
          {formatDate(String(loanData?.dueDate))}
        </Styled.TextBlack>
      </Styled.InstallmentDueDate>

      <Styled.ProposalInformation variant="h6">
        Esta proposta será válida em até 15 dias e está sujeita a alterações de
        acordo com a data do aceite.
      </Styled.ProposalInformation>

      <Table
        disableBoxShadow
        checkboxSelection={false}
        columns={columns}
        rows={tableData}
      />
    </Styled.Card>
  );
};
export { ApprovedLoan };
