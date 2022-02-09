import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GridColumns } from '@mui/x-data-grid';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';
import { CircularProgress, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ptBR from 'date-fns/locale/pt-BR';

import { ReactComponent as ConfirmIcon } from 'assets/icons/confirm.svg';

import useWindowDimensions from 'hooks/useWindowDimensions';

import { Layout } from 'components/Layout';
import { NoDataTable } from 'components/NoDataTable';
import { Table } from 'components/Table';

import { formatDate } from 'utils/formatDate';
import { formatValue } from 'utils/formatValue';

import { format } from 'date-fns';
import { RoutingPath } from 'utils/routing';
import * as Styled from './styles';
import { InstallmentsCard } from './components/InstallmentsCard';
import {
  ContractInstallments as ContractInstallmentsType,
  InstallmentDetails,
  InstallmentDetailsFormatted,
} from './models/contractInstallments';
import { ContractsInstallmentsServices } from './services/contract-installments-services';

const ContractInstallments: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [contractDetails, setContractDetails] =
    useState<ContractInstallmentsType>();
  const [tableData, setTableData] = useState<InstallmentDetailsFormatted[]>([]);
  const [fetchingInstallments, setFetchingInstallments] = useState(true);
  const [cardDataOpen, setCardDataOpen] = useState(false);
  const { width } = useWindowDimensions();
  const history = useHistory();

  const formatStringYearMonth = (data: string) => {
    if (!data) return '';

    return data.replace(/(\d{4})(\d{2})/, '$2/$1');
  };

  const formatMonthYear = (data: string) => {
    const formatted = data.replace(/(\d{4})(\d{2})/, '$1/$2');
    const date = new Date(formatted);

    return `${format(date, 'LLLL', { locale: ptBR })}/${
      formatted.split('/')[0]
    }`;
  };

  const columns = useMemo<GridColumns>(
    () => [
      {
        field: 'installment',
        headerName: 'Nº da parcela',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 200,
      },
      {
        field: 'dateSheet',
        headerName: 'Vencimento da folha',
        hideSortIcons: true,
        disableReorder: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 300,
      },
      {
        field: 'installmentsValue',
        headerName: 'Valor da Parcela',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        width: 300,
      },
      {
        field: 'installmentStatus',
        headerName: 'Situação',
        hideSortIcons: true,
        disableColumnMenu: true,
        headerAlign: 'center',
        flex: 1,
        renderCell: ({ value }) => (
          <Styled.CapitalizeCenter>{value}</Styled.CapitalizeCenter>
        ),
      },
    ],
    [],
  );

  const NoContracts: React.FC = () => (
    <NoDataTable>Nenhuma parcela para ser apresentada</NoDataTable>
  );

  const getDateFirstDiscount = (installmentDetails?: InstallmentDetails[]) =>
    installmentDetails && installmentDetails[0].dateSheet
      ? formatMonthYear(installmentDetails[0].dateSheet)
      : '-';

  const getDateLastDiscount = (installmentDetails?: InstallmentDetails[]) => {
    if (installmentDetails && installmentDetails.length > 0) {
      const lastInstallment = installmentDetails[installmentDetails.length - 1];

      return formatMonthYear(lastInstallment.dateSheet);
    }
    return '-';
  };

  const getContractDate = (date?: Date) => {
    if (!date) return '-';

    const formattedDate = formatDate(date);

    if (formattedDate === '01/01/1') return '-';

    return formattedDate;
  };

  const getDataValue = (
    data: string | number | JSX.Element | null | undefined,
  ) => {
    if (fetchingInstallments) return <CircularProgress size={20} />;

    if (!data) return '-';

    return data;
  };

  const getIconButton = () => (cardDataOpen ? <ExpandLess /> : <ExpandMore />);

  const showLoading = () =>
    fetchingInstallments && <CircularProgress className="loading" />;

  const getContent = () =>
    width && width > 768 ? (
      <Table
        loading={fetchingInstallments}
        columns={columns}
        rows={tableData}
        noData={NoContracts}
        rowHeight={55}
        disableBoxShadow
      />
    ) : (
      <Styled.InstallmentsContainer>
        <Styled.InstallmentsTitle>Parcelas</Styled.InstallmentsTitle>

        {showLoading()}

        <Styled.Installments data-testid="cards-container">
          {tableData.map(item => (
            <InstallmentsCard
              key={item.id}
              data={item}
              totalInstallments={tableData.length}
            />
          ))}
        </Styled.Installments>
      </Styled.InstallmentsContainer>
    );

  useEffect(() => {
    if (id)
      ContractsInstallmentsServices.fetchContractDetails(id)
        .then(({ data: { data } }) => {
          setContractDetails(data);

          setTableData(
            data.installmentDetails.map(item => ({
              id: item.installment,
              installment: item.installment,
              installmentStatus: item.installmentStatus,
              dateSheet: formatStringYearMonth(item.dateSheet),
              installmentsValue: formatValue(item.installmentsValue),
            })),
          );
        })
        .catch(() => {
          history.push(RoutingPath.CONTRACTS);
        })
        .finally(() => setFetchingInstallments(false));
  }, [id, history]);

  return (
    <Layout
      containerStyles={{
        maxWidth: '1286px',
      }}
    >
      <Styled.Container>
        <Styled.Box>
          <Styled.ExpandableCard open={cardDataOpen}>
            <Styled.Header>
              <Styled.Breadcrumb>
                <Styled.BreadcrumbRoot>Meus contratos</Styled.BreadcrumbRoot>
                <span>{'>'}</span>
                <Styled.BreadcrumbPage>Contrato</Styled.BreadcrumbPage>

                <Styled.Status>
                  <Styled.StatusLabel>Status:</Styled.StatusLabel>
                  {getDataValue(
                    <Styled.StatusText data-testid="status-text">
                      <ConfirmIcon /> {contractDetails?.status}
                    </Styled.StatusText>,
                  )}
                </Styled.Status>
              </Styled.Breadcrumb>
            </Styled.Header>

            <Styled.DataContainer className="data-container">
              <Styled.Data>
                <Styled.DataLabel>Nº do contrato:</Styled.DataLabel>
                <Styled.DataValue data-testid="contract-number">
                  {getDataValue(contractDetails?.contractNumber)}
                </Styled.DataValue>
              </Styled.Data>

              <Styled.Data>
                <Styled.DataLabel>Data do contrato</Styled.DataLabel>
                <Styled.DataValue data-testid="contract-date">
                  {getDataValue(getContractDate(contractDetails?.contractDate))}
                </Styled.DataValue>
              </Styled.Data>

              <Styled.Data>
                <Styled.DataLabel>Nº de Parcelas</Styled.DataLabel>
                <Styled.DataValue data-testid="quantity-installment">
                  {getDataValue(contractDetails?.quantityInstallment)}
                </Styled.DataValue>
              </Styled.Data>

              <Styled.Data>
                <Styled.DataLabel>Valor da Parcela</Styled.DataLabel>
                <Styled.DataValue data-testid="installments-value">
                  {getDataValue(
                    formatValue(contractDetails?.installmentsValue),
                  )}
                </Styled.DataValue>
              </Styled.Data>

              <Styled.Data>
                <Styled.DataLabel>Primeiro desconto em Folha</Styled.DataLabel>
                <Styled.DataValue data-testid="first-discount">
                  {getDataValue(
                    getDateFirstDiscount(contractDetails?.installmentDetails),
                  )}
                </Styled.DataValue>
              </Styled.Data>

              <Styled.Data>
                <Styled.DataLabel>Último desconto em Folha</Styled.DataLabel>
                <Styled.DataValue data-testid="last-discount">
                  {getDataValue(
                    getDateLastDiscount(contractDetails?.installmentDetails),
                  )}
                </Styled.DataValue>
              </Styled.Data>

              <Styled.Data>
                <Styled.DataLabel>Valor total do contrato</Styled.DataLabel>
                <Styled.DataValue data-testid="value">
                  {getDataValue(formatValue(contractDetails?.value))}
                </Styled.DataValue>
              </Styled.Data>
            </Styled.DataContainer>

            <IconButton
              aria-label="Expandir/fechar card"
              onClick={() => setCardDataOpen(state => !state)}
            >
              {getIconButton()}
            </IconButton>
          </Styled.ExpandableCard>

          {getContent()}
        </Styled.Box>
      </Styled.Container>
    </Layout>
  );
};

export default withAITracking(
  reactPlugin,
  ContractInstallments,
  'ContractInstallments',
);
