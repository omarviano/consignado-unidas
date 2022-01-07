import React, { useMemo, useState, useEffect } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { RoutingPath } from 'utils/routing';

import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { Button } from 'components/Buttons/Button';
import { Table } from 'components/Table';
import { NoDataTable } from 'components/NoDataTable';

import useWindowDimensions from 'hooks/windowDimensions';
import { formatDate } from 'utils/formatDate';
import { formatValue } from 'utils/formatValue';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from 'hooks/appInsights';

import * as Styled from './styles';
import { ContractsServices } from './services/contracts-services';
import { ContractFormatted } from './models/contract';
import { ContractCard } from './components/ContractCard';

const Contracts: React.FC = () => {
  const history = useHistory();
  const [bottomOfPage, setBottomOfPage] = useState(false);
  const [tableData, setTableData] = useState<ContractFormatted[]>([]);
  const [fetchingContracts, setFetchingContracts] = useState(true);
  const { width } = useWindowDimensions();
  const columns = useMemo<GridColumns>(
    () => [
      {
        field: 'date',
        headerName: 'Data da contratação',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 180,
      },
      {
        field: 'number',
        headerName: 'Contrato',
        hideSortIcons: true,
        disableReorder: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 120,
      },
      {
        field: 'installments',
        headerName: 'N° de Parcelas',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 160,
      },
      {
        field: 'value',
        headerName: 'Valor total do empréstimo',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 240,
      },
      {
        field: 'installmentValue',
        headerName: 'Valor da parcela',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 148,
      },
      {
        field: 'status',
        headerName: 'Status',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 127,
      },
      {
        field: 'details',
        headerName: 'Detalhes',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 168,
        renderCell: () => (
          <Styled.TableButton variant="contained">Acessar</Styled.TableButton>
        ),
      },
    ],
    [],
  );

  const goToHome = () => {
    history.push(RoutingPath.LOGGEDAREA);
  };

  useEffect(() => {
    ContractsServices.fetchContracts()
      .then(({ data: { data: contracts = [] } }) => {
        setTableData(
          contracts.map(contract => ({
            ...contract,
            id: contract.number,
            date: formatDate(contract.date) || '',
            value: formatValue(contract.value),
            installmentValue: formatValue(contract.installmentValue),
            installments: contract.installments?.toString().padStart(2, '0'),
          })),
        );
      })
      .finally(() => setFetchingContracts(false));
  }, []);

  const NoContracts: React.FC = () => (
    <NoDataTable>Você ainda não possui contratos</NoDataTable>
  );

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 160;

    if (bottom) setBottomOfPage(true);
    else setBottomOfPage(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout
        containerStyles={{
          maxWidth: '1320px',
        }}
      >
        <Styled.Container>
          <Styled.Box>
            <Styled.Header>
              <Styled.Breadcrumb>
                <Styled.BreadcrumbRoot>Meus contratos</Styled.BreadcrumbRoot>
                <span>{'>'}</span>
                <Styled.BreadcrumbPage>Contrato</Styled.BreadcrumbPage>
              </Styled.Breadcrumb>

              <Styled.ButtonContainer
                bottomOfPage={bottomOfPage}
                className="button-container"
              >
                <Button type="button" variant="outlined" onClick={goToHome}>
                  Simular novo empréstimo
                </Button>
              </Styled.ButtonContainer>
            </Styled.Header>

            {width && width > 720 ? (
              <Table
                loading={fetchingContracts}
                columns={columns}
                rows={tableData}
                noData={NoContracts}
                rowHeight={88}
              />
            ) : (
              <Styled.ResponsiveContainer noData={tableData.length === 0}>
                {tableData.map(item => (
                  <ContractCard key={item.id} data={item} />
                ))}

                {fetchingContracts && <CircularProgress className="loading" />}

                {tableData.length === 0 && !fetchingContracts && (
                  <Styled.NoData>Você ainda não possui contratos</Styled.NoData>
                )}
              </Styled.ResponsiveContainer>
            )}
          </Styled.Box>
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export default withAITracking(reactPlugin, Contracts, 'Contracts');
