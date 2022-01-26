import { FC, useEffect, useMemo, useState } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { GridColumns, GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import useWindowDimensions from 'hooks/windowDimensions';
import { getToken } from 'hooks/auth/storage';
import useModal from 'hooks/modal';
import { SimulateLoanProvider, useSimulateLoan } from 'hooks/simulate';

import { withContext } from 'utils/withContext';
import { Table } from 'components/Table';
import { useSimulateLoanRealTime } from 'hooks/simulateRealtime';
import { formatValue } from 'utils/formatValue';
import { TableSimulateProps } from 'interface/tableSimulate';
import { Button } from 'components/Buttons/Button';
import { Modal } from 'components/Modal';
import { RoutingPath } from 'utils/routing';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';
import {
  useModalSimulateLoan,
  ModalSimulateLoanProvider,
} from 'pages/LoggedArea/components/ModalSimulateLoan/context';
import { ModalSimulateLoan } from 'pages/LoggedArea/components/ModalSimulateLoan';
import { generateRandom } from 'utils/generateRandom';
import { CardSimulateLoan } from './components/CardSimulateLoan';
import { LoanDetails } from './components/LoanDetails';

import * as Styled from './styles';
import { SimulateLoanServices } from './services/simulate-loan.services';
import { InstallmentTableData } from './models/simulate-loan';
import { InstallmentCard } from './components/InstallmentCard';

const SimulateLoan: FC = withContext(
  () => {
    const history = useHistory();
    const { width } = useWindowDimensions();
    const { dataSimulateLoan, valueSliderSimulate } = useSimulateLoanRealTime();
    const { requestStatus, modalActive, statusCode } = useSimulateLoan();
    const { toggleModal } = useModalSimulateLoan();
    const [tableData, setTableData] = useState<InstallmentTableData[]>([]);
    const [selectedRow, setSelectedRow] = useState<TableSimulateProps>();
    const { open: modalSuccesOpen, toggle: toggleModalSucces } = useModal();
    const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
    const { open: modalConfirmOpen, toggle: toggleModalConfirm } = useModal();
    const [requestingLoan, setRequestingLoan] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
      if (valueSliderSimulate <= 0) {
        history.push(RoutingPath.LOGGEDAREA);
      }
    }, [history, valueSliderSimulate]);

    useEffect(() => {
      if (Object.keys(dataSimulateLoan).length === 0) {
        return;
      }

      const data = dataSimulateLoan.installments.map(item => ({
        ...item,
        id: generateRandom(),
        valueFormatted: formatValue(item.value),
        effectiveCostPerYearFormatted: `${item.effectiveCostPerYear}%`,
        feesPerMonthFormatted: `${item.feesPerMonth.toFixed(2)}%`,
        quantityFormatted: item.quantity.toString().padStart(2, '0'),
      }));
      setTableData(data);
    }, [dataSimulateLoan]);

    useEffect(() => {
      if (modalActive && statusCode !== 500) {
        toggleModal();
        setTableData([]);
      }
      return () => {
        <> </>;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalActive, statusCode]);

    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

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

    const goToAccompaniment = () => {
      history.push(RoutingPath.ACCOMPANIMENT);
    };

    const handleSelectionModelChange = (selection: GridSelectionModel) => {
      if (selection.length > 1) {
        const selectionSet = new Set(selectionModel);
        const result = selection.filter(s => !selectionSet.has(s));

        setSelectionModel(result);
        setSelectedRow(tableData.find(item => item.id === result[0]));
      } else {
        setSelectionModel(selection);
        setSelectedRow(tableData.find(item => item.id === selection[0]));
      }
    };

    const applyForLoan = () => {
      toggleModalConfirm();
    };

    const confirmLoanRequest = async () => {
      if (!selectedRow) return;

      try {
        setRequestingLoan(true);

        await SimulateLoanServices.simulate({
          value: dataSimulateLoan.value,
          simulationId: dataSimulateLoan.id,
          installment: selectedRow,
        });

        toggleModalSucces();
      } catch (error) {
        const { response } = error as AxiosError;
        setErrorMessage(response?.data?.message || 'ERRO');

        if (response && response.status < 500) {
          toggleModalError();
        }
      } finally {
        setRequestingLoan(false);
      }
    };

    const handleApplyForLoan = async (id: number) => {
      setSelectedRow(tableData.find(item => item.id === id));
      applyForLoan();
    };

    const displayCorrectText = useMemo(() => {
      if (requestingLoan) {
        return 'Confirmando...';
      }
      return 'Confirmar';
    }, [requestingLoan]);

    const loaderCircularProgress = () => {
      if (requestStatus.loading) {
        return <CircularProgress className="loading" />;
      }

      return <></>;
    };

    const showInstallmentCard = () => {
      if (!requestStatus.loading) {
        return tableData.map(item => (
          <InstallmentCard
            key={item.id}
            data={item}
            onSelect={handleApplyForLoan}
          />
        ));
      }

      return <></>;
    };

    const showTextTable = () => {
      if (tableData.length === 0 && !requestStatus.loading) {
        return <Styled.NoData>Nenhum parcela disponível</Styled.NoData>;
      }

      return <></>;
    };

    return (
      <RouteAccess typesOfAccess="auth">
        <Layout
          containerStyles={{
            maxWidth: '1276px',
          }}
        >
          <Styled.Container>
            <CardSimulateLoan />

            {width && width > 1000 ? (
              <>
                <Styled.SelectMostSuitableOption>
                  Selecione a opção mais adequada para sua situação financeira
                  atual
                </Styled.SelectMostSuitableOption>
                <Table
                  loading={requestStatus.loading}
                  checkboxSelection
                  selectionModel={selectionModel}
                  onSelectionModelChange={handleSelectionModelChange}
                  columns={columns}
                  rows={tableData}
                />

                <Styled.ContainerButton>
                  <Styled.RequestButton
                    type="button"
                    variant="contained"
                    onClick={applyForLoan}
                    disabled={!selectedRow}
                  >
                    Solicitar Empréstimo
                  </Styled.RequestButton>
                </Styled.ContainerButton>
              </>
            ) : (
              <Styled.ResponsiveContainer>
                <LoanDetails />

                {loaderCircularProgress()}

                {showInstallmentCard()}

                {showTextTable}
              </Styled.ResponsiveContainer>
            )}

            <Modal open={modalSuccesOpen} onClose={goToAccompaniment}>
              <Styled.ModalSuccessContent>
                <CheckCircle className="success-icon" />

                <Styled.ModalText>Solicitação enviada!</Styled.ModalText>

                <Styled.ModalText>
                  Sua solicitação será analisada. Assim que tivermos a resposta,
                  entraremos em contato por email e por aqui. Qualquer dúvida,
                  entre em contato com RH da empresa.
                </Styled.ModalText>

                <Button
                  type="button"
                  variant="contained"
                  className="redirect-button"
                  onClick={goToAccompaniment}
                >
                  Acompanhar
                </Button>
              </Styled.ModalSuccessContent>
            </Modal>

            <Modal open={modalErrorOpen} onClose={toggleModalError}>
              <Styled.ModalErrorContent>
                <Cancel className="cancel-icon" />

                <Styled.ModalText>
                  Ops, solicitação não realizada
                </Styled.ModalText>

                <Styled.ModalText
                  dangerouslySetInnerHTML={{ __html: errorMessage || '' }}
                />
              </Styled.ModalErrorContent>
            </Modal>

            <Modal open={modalConfirmOpen} onClose={toggleModalConfirm}>
              <Styled.ModalConfirmContent>
                <Styled.ModalConfirmHello>
                  Olá, {getToken()?.user.name}! Tudo bem?
                  <b>Você confirma os seus dados abaixo?</b>
                </Styled.ModalConfirmHello>

                <Styled.ModalConfirmData>
                  email: <span>{getToken()?.user.email}</span>
                  <br />
                  telefone:{' '}
                  <span>
                    {getToken()?.user.phoneNumber?.replace(
                      /(\d{2})(\d{5})(\d{4})/,
                      '($1) $2-$3',
                    )}
                  </span>
                </Styled.ModalConfirmData>

                <Button
                  type="button"
                  className="confirm-button"
                  variant="contained"
                  onClick={confirmLoanRequest}
                  disabled={requestingLoan}
                >
                  {displayCorrectText}
                </Button>
              </Styled.ModalConfirmContent>
            </Modal>

            <ModalSimulateLoan />
          </Styled.Container>
        </Layout>
      </RouteAccess>
    );
  },
  SimulateLoanProvider,
  ModalSimulateLoanProvider,
);

export default withAITracking(reactPlugin, SimulateLoan, 'SimulateLoan');
