import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GridColumns } from '@mui/x-data-grid';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';
import { CircularProgress, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ptBR from 'date-fns/locale/pt-BR';

import { ReactComponent as ConfirmIcon } from 'assets/icons/confirm.svg';

import useWindowDimensions from 'hooks/windowDimensions';

import { RouteAccess } from 'components/RouteAccess';
import { Layout } from 'components/Layout';
import { NoDataTable } from 'components/NoDataTable';
import { Table } from 'components/Table';

import { formatDate } from 'utils/formatDate';
import { formatValue } from 'utils/formatValue';

import { format } from 'date-fns';
import * as Styled from './styles';
import { InstallmentsCard } from './components/InstallmentsCard';
import {
  ContractInstallments as ContractInstallmentsType,
  InstallmentDetails,
  InstallmentDetailsFormatted,
} from './models/contractInstallments';
import { ContractsInstallmentsServices } from './services/contract-installments-services';

const ContractInstallments = () => {
  const { id } = useParams<{ id?: string }>();
  const [contractDetails, setContractDetails] =
    useState<ContractInstallmentsType>();
  const [tableData, setTableData] = useState<InstallmentDetailsFormatted[]>([]);
  const [fetchingInstallments, setFetchingInstallments] = useState(true);
  const [cardDataOpen, setCardDataOpen] = useState(false);
  const { width } = useWindowDimensions();

  const formatStringYearMonth = (data: string) =>
    data.replace(/(\d{4})(\d{2})/, '$2/$1');

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
    const formattedDate = formatDate(date || null);

    if (formattedDate == null || formattedDate === '01/01/1') return '-';

    return formattedDate;
  };

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
              dateSheet: item.dateSheet
                ? formatStringYearMonth(item.dateSheet)
                : '-',
              installmentsValue: formatValue(item.installmentsValue),
            })),
          );
        })
        .finally(() => setFetchingInstallments(false));
  }, [id]);

  return (
    <RouteAccess typesOfAccess="auth">
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
                    {contractDetails?.status ? (
                      <Styled.StatusText>
                        <ConfirmIcon /> {contractDetails?.status}
                      </Styled.StatusText>
                    ) : (
                      <CircularProgress size={20} />
                    )}
                  </Styled.Status>
                </Styled.Breadcrumb>
              </Styled.Header>

              <Styled.DataContainer className="data-container">
                <Styled.Data>
                  <Styled.DataLabel>Nº do contrato:</Styled.DataLabel>
                  <Styled.DataValue>
                    {contractDetails?.contractNumber || (
                      <CircularProgress size={20} />
                    )}
                  </Styled.DataValue>
                </Styled.Data>

                <Styled.Data>
                  <Styled.DataLabel>Data do contrato</Styled.DataLabel>
                  <Styled.DataValue>
                    {fetchingInstallments ? (
                      <CircularProgress size={20} />
                    ) : (
                      getContractDate(contractDetails?.contractDate)
                    )}
                  </Styled.DataValue>
                </Styled.Data>

                <Styled.Data>
                  <Styled.DataLabel>Nº de Parcelas</Styled.DataLabel>
                  <Styled.DataValue>
                    {contractDetails?.quantityInstallment || (
                      <CircularProgress size={20} />
                    )}
                  </Styled.DataValue>
                </Styled.Data>

                <Styled.Data>
                  <Styled.DataLabel>Valor da Parcela</Styled.DataLabel>
                  <Styled.DataValue>
                    {contractDetails?.installmentsValue ? (
                      formatValue(contractDetails.installmentsValue)
                    ) : (
                      <CircularProgress size={20} />
                    )}
                  </Styled.DataValue>
                </Styled.Data>

                <Styled.Data>
                  <Styled.DataLabel>
                    Primeiro desconto em Folha
                  </Styled.DataLabel>
                  <Styled.DataValue>
                    {contractDetails?.installmentDetails ? (
                      getDateFirstDiscount(contractDetails.installmentDetails)
                    ) : (
                      <CircularProgress size={20} />
                    )}
                  </Styled.DataValue>
                </Styled.Data>

                <Styled.Data>
                  <Styled.DataLabel>Último desconto em Folha</Styled.DataLabel>
                  <Styled.DataValue>
                    {contractDetails?.installmentDetails ? (
                      getDateLastDiscount(contractDetails.installmentDetails)
                    ) : (
                      <CircularProgress size={20} />
                    )}
                  </Styled.DataValue>
                </Styled.Data>

                <Styled.Data>
                  <Styled.DataLabel>Valor total do contrato</Styled.DataLabel>
                  <Styled.DataValue>
                    {contractDetails?.value ? (
                      formatValue(contractDetails.value)
                    ) : (
                      <CircularProgress size={20} />
                    )}
                  </Styled.DataValue>
                </Styled.Data>
              </Styled.DataContainer>

              <IconButton
                aria-label="Expandir/fechar card"
                onClick={() => setCardDataOpen(state => !state)}
              >
                {cardDataOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Styled.ExpandableCard>

            {width && width > 768 ? (
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

                {fetchingInstallments && (
                  <CircularProgress className="loading" />
                )}

                <Styled.Installments>
                  {tableData.map(item => (
                    <InstallmentsCard
                      data={item}
                      totalInstallments={tableData.length}
                    />
                  ))}
                </Styled.Installments>
              </Styled.InstallmentsContainer>
            )}
          </Styled.Box>
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export default withAITracking(
  reactPlugin,
  ContractInstallments,
  'ContractInstallments',
);
