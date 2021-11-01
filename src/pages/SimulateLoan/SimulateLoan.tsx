import { FC, useMemo, useState } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { GridColumns, GridRowId } from '@mui/x-data-grid';

import { SimulateLoanProvider } from 'hooks/simulate';
import { withContext } from 'utils/withContext';
import { Table } from 'components/Table';
import { CardSimulateLoan } from './components/CardSimulateLoan';

import * as Styled from './styles';

const SimulateLoan: FC = withContext(() => {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const columns = useMemo<GridColumns>(
    () => [
      {
        field: 'quantity',
        headerName: 'Parcelas',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
      },
      {
        field: 'value',
        headerName: 'Valor da parcela',
        hideSortIcons: true,
        disableReorder: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'feesPerMonth',
        headerName: 'Juros',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'effectiveCostPerYear',
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
    <RouteAccess typesOfAccess="auth">
      <Layout
        containerStyles={{
          maxWidth: '1276px',
          padding: '0 24px',
        }}
      >
        <CardSimulateLoan />
        <Styled.SelectMostSuitableOption>
          Selecione a opção mais adequada para sua situação financeira atual
        </Styled.SelectMostSuitableOption>

        <Table
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={selection => {
            if (selection.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = selection.filter(s => !selectionSet.has(s));

              setSelectionModel(result);
            } else {
              setSelectionModel(selection);
            }
          }}
          columns={columns}
          rows={[
            {
              id: 1,
              quantity: 36,
              value: 'R$1.200,00',
              feesPerMonth: '2%',
              effectiveCostPerYear: '0.002',
            },
            {
              id: 2,
              quantity: 36,
              value: 'R$1.200,00',
              feesPerMonth: '2%',
              effectiveCostPerYear: '0.002',
            },
            {
              id: 3,
              quantity: 36,
              value: 'R$1.200,00',
              feesPerMonth: '2%',
              effectiveCostPerYear: '0.002',
            },
            {
              id: 4,
              quantity: 36,
              value: 'R$1.200,00',
              feesPerMonth: '2%',
              effectiveCostPerYear: '0.002',
            },
            {
              id: 5,
              quantity: 36,
              value: 'R$1.200,00',
              feesPerMonth: '2%',
              effectiveCostPerYear: '0.002',
            },
            {
              id: 6,
              quantity: 36,
              value: 'R$1.200,00',
              feesPerMonth: '2%',
              effectiveCostPerYear: '0.002',
            },
            {
              id: 7,
              quantity: 36,
              value: 'R$1.200,00',
              feesPerMonth: '2%',
              effectiveCostPerYear: '0.002',
            },
          ]}
        />
      </Layout>
    </RouteAccess>
  );
}, SimulateLoanProvider);

export { SimulateLoan };
