import { FC, useEffect, useMemo, useState } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { GridColumns, GridRowId } from '@mui/x-data-grid';

import { SimulateLoanProvider, useSimulateLoan } from 'hooks/simulate';
import { withContext } from 'utils/withContext';
import { Table } from 'components/Table';
import { useSimulateLoanRealTime } from 'hooks/simulateRealtime';
import { formatValue } from 'utils/formatValue';
import { TableSimulateProps } from 'interface/tableSimulate';
import { CardSimulateLoan } from './components/CardSimulateLoan';

import * as Styled from './styles';

const SimulateLoan: FC = withContext(() => {
  const { dataSimulateLoan } = useSimulateLoanRealTime();
  const { requestStatus } = useSimulateLoan();
  const [tableData, setTableData] = useState<TableSimulateProps[]>([]);

  useEffect(() => {
    const data = dataSimulateLoan.installments.map(item => ({
      id: Math.random(),
      value: formatValue(item.value),
      effectiveCostPerYear: formatValue(item.effectiveCostPerYear),
      feesPerMonth: `${item.feesPerMonth.toFixed(2)}%`,
      quantity: item.quantity.toString().padStart(2, '0'),
    }));
    setTableData(data);
  }, [dataSimulateLoan.id, dataSimulateLoan.installments]);

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
          loading={requestStatus.loading}
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
          rows={tableData}
        />
      </Layout>
    </RouteAccess>
  );
}, SimulateLoanProvider);

export { SimulateLoan };
