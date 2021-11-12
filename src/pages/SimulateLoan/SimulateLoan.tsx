import { FC, useEffect, useMemo, useState } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { GridColumns, GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import { Close, CheckCircle, Cancel } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getToken } from 'hooks/auth/storage';
import useModal from 'hooks/modal';
import { SimulateLoanProvider, useSimulateLoan } from 'hooks/simulate';
import { withContext } from 'utils/withContext';
import { Table } from 'components/Table';
import { useSimulateLoanRealTime } from 'hooks/simulateRealtime';
import { formatValue } from 'utils/formatValue';
import { TableSimulateProps } from 'interface/tableSimulate';
import { Button } from 'components/Buttons/Button';
import { RoutingPath } from 'utils/routing';
import {
  useModalSimulateLoan,
  ModalSimulateLoanProvider,
} from 'pages/LoggedArea/components/ModalSimulateLoan/context';
import { ModalSimulateLoan } from 'pages/LoggedArea/components/ModalSimulateLoan';
import { CardSimulateLoan } from './components/CardSimulateLoan';

import * as Styled from './styles';
import { SimulateLoanServices } from './services/simulate-loan.services';

const SimulateLoan: FC = withContext(
  () => {
    const history = useHistory();
    const { dataSimulateLoan } = useSimulateLoanRealTime();
    const { requestStatus, modalActive, statusCode } = useSimulateLoan();
    const { toggleModal } = useModalSimulateLoan();
    const [tableData, setTableData] = useState<any>([]);
    const [selectedRow, setSelectedRow] = useState<TableSimulateProps>();
    const { open: modalSuccesOpen, toggle: toggleModalSucces } = useModal();
    const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
    const { open: modalConfirmOpen, toggle: toggleModalConfirm } = useModal();
    const [requestingLoan, setRequestingLoan] = useState(false);

    useEffect(() => {
      const data = dataSimulateLoan.installments.map(item => ({
        ...item,
        id: Math.random(),
        valueFormatted: formatValue(item.value),
        effectiveCostPerYearFormatted: formatValue(item.effectiveCostPerYear),
        feesPerMonthFormatted: `${item.feesPerMonth.toFixed(2)}%`,
        quantityFormatted: item.quantity.toString().padStart(2, '0'),
      }));
      setTableData(data);
    }, [dataSimulateLoan.id, dataSimulateLoan.installments]);

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

    const applyForLoan = async () => {
      try {
        const {
          data: { data },
        } = await SimulateLoanServices.checkCreditUnderReview();

        if (data === null) toggleModalConfirm();
        else toggleModalError();
      } catch (error) {
        const { response } = error as AxiosError;

        if (response && response.status < 500) toggleModalError();
      }
    };

    const confirmLoanRequest = async () => {
      if (!selectedRow) return;

      try {
        setRequestingLoan(true);

        await SimulateLoanServices.checkCreditUnderReview();

        await SimulateLoanServices.simulate({
          value: dataSimulateLoan.value,
          simulationId: dataSimulateLoan.id,
          installment: selectedRow,
        });

        toggleModalSucces();
      } catch (error) {
        const { response } = error as AxiosError;

        if (response && response.status < 500) toggleModalError();
      } finally {
        setRequestingLoan(false);
      }
    };

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

          <Modal open={modalSuccesOpen} onClose={goToAccompaniment}>
            <Styled.ModalSuccessContent>
              <Styled.CloseModalButton
                type="button"
                onClick={goToAccompaniment}
              >
                <Close fontSize="small" color="primary" />
              </Styled.CloseModalButton>

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
              <Styled.CloseModalButton type="button" onClick={toggleModalError}>
                <Close fontSize="small" color="primary" />
              </Styled.CloseModalButton>

              <Cancel className="cancel-icon" />

              <Styled.ModalText>Solicitação negada</Styled.ModalText>

              <Styled.ModalText>
                A solicitação do seu empréstimo infelizmente não poderá ser
                realizada. Por favor, entre em contato com o RH.
              </Styled.ModalText>
            </Styled.ModalErrorContent>
          </Modal>

          <Modal open={modalConfirmOpen} onClose={toggleModalConfirm}>
            <Styled.ModalConfirmContent>
              <Styled.CloseModalButton
                type="button"
                onClick={toggleModalConfirm}
              >
                <Close fontSize="small" color="primary" />
              </Styled.CloseModalButton>

              <Styled.ModalConfirmHello>
                Olá, {getToken()?.user.name}! Tudo bem?
                <b>Você confirma os seus dados abaixo?</b>
              </Styled.ModalConfirmHello>

              <Styled.ModalConfirmData>
                email: {getToken()?.user.email}
                <br />
                telefone:{' '}
                {getToken()?.user.phoneNumber?.replace(
                  /(\d{2})(\d{5})(\d{4})/,
                  '($1) $2-$3',
                )}
              </Styled.ModalConfirmData>

              <Button
                type="button"
                className="confirm-button"
                variant="contained"
                onClick={confirmLoanRequest}
                disabled={requestingLoan}
              >
                {requestingLoan ? 'Confirmando...' : 'Confirmar'}
              </Button>
            </Styled.ModalConfirmContent>
          </Modal>

          <ModalSimulateLoan />
        </Layout>
      </RouteAccess>
    );
  },
  SimulateLoanProvider,
  ModalSimulateLoanProvider,
);

export { SimulateLoan };
