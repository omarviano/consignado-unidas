import { FC, useEffect, useMemo, useState } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { GridColumns, GridRowId } from '@mui/x-data-grid';
import { Modal } from '@mui/material';
import { Close, CheckCircle, Cancel } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

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
import { CardSimulateLoan } from './components/CardSimulateLoan';

import * as Styled from './styles';

const SimulateLoan: FC = withContext(() => {
  const history = useHistory();
  const { dataSimulateLoan } = useSimulateLoanRealTime();
  const { requestStatus } = useSimulateLoan();
  const [tableData, setTableData] = useState<TableSimulateProps[]>([]);
  const { open: modalSuccesOpen, toggle: toggleModalSucces } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
  const { open: modalConfirmOpen, toggle: toggleModalConfirm } = useModal();

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

  const goToAccompaniment = () => {
    history.push(RoutingPath.ACCOMPANIMENT);
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

        <Styled.ContainerButton>
          <Styled.RequestButton type="button" variant="contained">
            Solicitar Empréstimo
          </Styled.RequestButton>
        </Styled.ContainerButton>

        <Modal open={modalSuccesOpen} onClose={toggleModalSucces}>
          <Styled.ModalSuccessContent>
            <Styled.CloseModalButton type="button" onClick={toggleModalSucces}>
              <Close fontSize="small" color="primary" />
            </Styled.CloseModalButton>

            <CheckCircle className="success-icon" />

            <Styled.ModalText>Solicitação enviada!</Styled.ModalText>

            <Styled.ModalText>
              Sua solicitação será analisada. Assim que tivermos a resposta,
              entraremos em contato por email e por aqui. Qualquer dúvida, entre
              em contato com RH da empresa.
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
            <Styled.CloseModalButton type="button" onClick={toggleModalConfirm}>
              <Close fontSize="small" color="primary" />
            </Styled.CloseModalButton>

            <Styled.ModalConfirmHello>
              Olá, {getToken()?.user.name}! Tudo bem?
              <b>Você confirma os seus dados abaixo?</b>
            </Styled.ModalConfirmHello>

            <Styled.ModalConfirmData>
              email: {getToken()?.user.email}
              <br />
              telefone: {getToken()?.user.phoneNumber}
            </Styled.ModalConfirmData>

            <Button
              type="button"
              className="confirm-button"
              variant="contained"
            >
              Confirmar
            </Button>
          </Styled.ModalConfirmContent>
        </Modal>
      </Layout>
    </RouteAccess>
  );
}, SimulateLoanProvider);

export { SimulateLoan };
