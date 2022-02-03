import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { RoutingPath } from 'utils/routing';

import { Tooltip } from 'components/Tooltip';
import { Layout } from 'components/Layout';
import { Button } from 'components/Buttons/Button';
import { Table } from 'components/Table';
import { NoDataTable } from 'components/NoDataTable';

import useWindowDimensions from 'hooks/useWindowDimensions';
import { formatDate } from 'utils/formatDate';
import { formatValue } from 'utils/formatValue';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';

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

  const goToDetails = useCallback(
    (id: string) => {
      history.push(`/contratos/${id}`);
    },
    [history],
  );

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
        width: 160,
      },
      {
        field: 'installments',
        headerName: 'N° de Parcelas',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 140,
      },
      {
        field: 'value',
        headerName: 'Valor total do empréstimo',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 220,
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
        align: 'center',
        renderCell: tableData => (
          <Tooltip placement="top" arrow title={tableData.row.status}>
            {tableData.row.status}
          </Tooltip>
        ),
      },
      {
        field: 'details',
        headerName: 'Detalhes',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 168,
        cellClassName: 'cell-button',
        renderCell: ({ row }) => (
          <Styled.TableButton
            variant="contained"
            onClick={() => goToDetails(row.id)}
            data-testid="table-button"
            className="bbb"
          >
            Acessar
          </Styled.TableButton>
        ),
      },
    ],
    [goToDetails],
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
    <Layout
      containerStyles={{
        maxWidth: '1286px',
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
              <Button
                type="button"
                variant="outlined"
                onClick={goToHome}
                data-testid="go-to-home"
              >
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
            <Styled.ResponsiveContainer
              data-testid="cards-container"
              noData={tableData.length === 0}
            >
              {tableData.map(item => (
                <ContractCard
                  key={item.id}
                  data={item}
                  onClickButton={goToDetails}
                />
              ))}

              {fetchingContracts && <CircularProgress className="loading" />}

              {tableData.length === 0 && !fetchingContracts && (
                <Styled.NoData data-testid="no-data-mobile">
                  Você ainda não possui contratos
                </Styled.NoData>
              )}
            </Styled.ResponsiveContainer>
          )}
        </Styled.Box>
      </Styled.Container>
    </Layout>
  );
};

export default withAITracking(reactPlugin, Contracts, 'Contracts');
