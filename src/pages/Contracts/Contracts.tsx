import React, { useMemo, useState, useEffect } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';

import { RoutingPath } from 'utils/routing';

import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { Button } from 'components/Buttons/Button';
import { Table } from 'components/Table';
import { NoDataTable } from 'components/NoDataTable';

import * as Styled from './styles';
import { ContractsServices } from './services/contracts-services';

const Contracts: React.FC = () => {
  const history = useHistory();
  const [tableData, setTableData] = useState([]);
  const [fetchingContracts, setFetchingContracts] = useState(true);
  const columns = useMemo<GridColumns>(
    () => [
      {
        field: 'date',
        headerName: 'Data',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
      },
      {
        field: 'number',
        headerName: 'Contrato',
        hideSortIcons: true,
        disableReorder: true,
        disableColumnMenu: true,
        headerAlign: 'center',
      },
      {
        field: 'installments',
        headerName: 'N° de Parcelas',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'value',
        headerName: 'Valor total do empréstimo',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'installmentValue',
        headerName: 'Valor da parcela',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
      {
        field: 'status',
        headerName: 'Status',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
      },
    ],
    [],
  );

  const goToHome = () => {
    history.push(RoutingPath.LOGGEDAREA);
  };

  useEffect(() => {
    ContractsServices.fetchContracts()
      .then(({ data }) => {
        setTableData([]);
      })
      .finally(() => setFetchingContracts(false));
  }, []);

  const NoContracts: React.FC = () => (
    <NoDataTable>Você ainda não possui contratos</NoDataTable>
  );

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout
        containerStyles={{
          maxWidth: '1286px',
          padding: 0,
        }}
      >
        <Styled.Container>
          <Styled.Box>
            <Styled.Header>
              <Styled.Breadcrumb>
                <Styled.BreadcrumbRoot>Meus contratos</Styled.BreadcrumbRoot>
                {'>'}
                <Styled.BreadcrumbPage>Contrato</Styled.BreadcrumbPage>
              </Styled.Breadcrumb>

              <Button type="button" variant="outlined" onClick={goToHome}>
                Simular novo empréstimo
              </Button>
            </Styled.Header>

            <Table
              loading={fetchingContracts}
              columns={columns}
              rows={tableData}
              noData={NoContracts}
            />
          </Styled.Box>
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export { Contracts };
