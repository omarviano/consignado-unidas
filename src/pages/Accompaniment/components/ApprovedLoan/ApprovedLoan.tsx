import { FC, useMemo, useEffect, useState, useRef } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { formatDate } from 'utils/formatDate';
import { formatValue } from 'utils/formatValue';
import { Table } from 'components/Table';
import useModal from 'hooks/modal';
import { getToken } from 'hooks/auth/storage';
import { Modal } from 'components/Modal';
import { Formik } from 'components/Formik';
import { Select } from 'components/Select/Select';
import { Grid } from '@mui/material';
import ufs from 'constants/ufs';
import { Input } from 'components/Inputs/Input';
import { ModalMessage } from 'components/ModalMessage';
import { CheckCircle, Warning } from '@mui/icons-material';
import { Bank } from 'pages/Accompaniment/models/bank';
import { AccompanimentServices } from 'pages/Accompaniment/services/accompaniment.services';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from 'utils/routing';
import { LoanDataProps } from 'pages/Accompaniment/models/loanData';
import { Autocomplete } from 'components/Autocomplete';
import useViaCEP from 'hooks/viaCEP';
import { AxiosError } from 'axios';
import { Document } from 'utils/document';
import { FormikProps } from 'formik';
import { UserDataProps, FormProps } from '../../models/userData';
import { schema } from './schema';
import * as Styled from './styles';

const ApprovedLoan: FC = () => {
  const history = useHistory();
  const { open: modalConfirmationOpen, toggle: toggleModalConfirmation } =
    useModal();
  const { open: modalSuccessOpen, toggle: toggleModalSuccess } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
  const { open: modalRefuseOpen, toggle: toggleModalRefuse } = useModal();
  const { open: modalRefuseAcceptOpen, toggle: toggleModalRefuseAccept } =
    useModal();
  const [banks, setBanks] = useState<{ name: string; value: string }[]>([]);
  const [loanData, setLoanData] = useState<LoanDataProps>();
  const [tableData, setTableData] = useState<any>([]);
  const { fetchCEP, notFound, address } = useViaCEP();
  const [cep, setCep] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [formValues, setFormValues] = useState<any>();

  const refFormik = useRef<FormikProps<FormProps> | null>();

  useEffect(() => {
    setFormValues({
      nationality: 'Brasileira',
      ...refFormik?.current?.values,
      ...address,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleInput = () => {
    const cepInput = document.getElementById('cep') as HTMLInputElement;
    setCep(cepInput?.value);
  };

  useEffect(() => {
    AccompanimentServices.checkCreditUnderReview().then(({ data }) => {
      const response = data.data?.lastQuotation as LoanDataProps;

      setLoanData(response);
    });
  }, []);

  useEffect(() => {
    const data = [
      {
        id: Math.random(),
        valueFormatted: formatValue(Number(loanData?.value)),
        effectiveCostPerYearFormatted: formatValue(
          Number(loanData?.effectiveCostPerYear),
        ),
        feesPerMonthFormatted: `${loanData?.feesPerMonth.toFixed(2)}%`,
        quantityFormatted: loanData?.quantity.toString().padStart(2, '0'),
      },
    ];

    setTableData(data);
  }, [loanData]);

  useEffect(() => {
    AccompanimentServices.fetchBanks().then(({ data }) => {
      const response = data.data as Bank[];

      setBanks(
        response.map(item => ({
          value: item.id.toString(),
          name: item.description,
        })),
      );
    });
  }, []);

  useEffect(() => {
    fetchCEP(cep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cep]);

  const handleSubmit = async (data): Promise<void> => {
    try {
      setLoading(true);

      const dataSubmit: UserDataProps = {
        nationality: data?.nationality,
        profession: data?.profession,
        number: data?.number,
        complement: data?.complement,
        bankCode: data?.bankCode,
        agency: data?.agency,
        digit: data?.digit,
        accountNumber: data?.accountNumber,
        zipCode: `${Document.removeMask(data?.cep)}`,
        publicPlace: data?.logradouro,
        district: data?.bairro,
        city: data?.localidade,
        state: data?.uf,
      };

      await AccompanimentServices.approveLoan(dataSubmit);

      toggleModalSuccess();
    } catch (error) {
      setLoading(true);
      const { response } = error as AxiosError;
      setErrorMessage(response?.data?.message || 'ERRO');
      toggleModalError();
    } finally {
      setLoading(false);
    }
  };

  const handleRefuseLoan = async (): Promise<void> => {
    try {
      setLoading(true);

      await AccompanimentServices.refuseLoan(Number(loanData?.id));

      toggleModalRefuse();
      toggleModalRefuseAccept();
    } catch (error) {
      setLoading(true);
      const { response } = error as AxiosError;
      setErrorMessage(response?.data?.message || 'ERRO');
      toggleModalError();
    } finally {
      setLoading(false);
    }
  };

  const goToLoggedArea = () => {
    toggleModalRefuseAccept();
    history.push(RoutingPath.LOGGEDAREA);
  };

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

  return (
    <Styled.Card>
      <Styled.LoanInformation variant="h2">
        Olá {getToken()?.user.name}! Tudo bem? Temos uma ótima notícia! <br /> A
        sua propósta de empréstimo foi{' '}
        <Styled.Approved>{loanData?.status && 'APROVADA'}</Styled.Approved>!
      </Styled.LoanInformation>

      <Styled.TotalAmountOfLoanRequested variant="h2">
        Valor total do empréstimo solicitado:{' '}
        <Styled.TextBlack>
          {formatValue(Number(loanData?.requestedAmount))}
        </Styled.TextBlack>
      </Styled.TotalAmountOfLoanRequested>

      <Styled.InstallmentDueDate variant="h2">
        Data de Vencimento da 1ª parcela:{' '}
        <Styled.TextBlack>{formatDate(loanData?.dueDate)}</Styled.TextBlack>
      </Styled.InstallmentDueDate>

      <Styled.ProposalInformation variant="h6">
        Esta proposta será válida em até 15 dias e está sujeita a alterações de
        acordo com a data do aceite.
      </Styled.ProposalInformation>

      <Table
        disableBoxShadow
        checkboxSelection={false}
        columns={columns}
        rows={tableData}
      />

      <Styled.DivButtons>
        <Styled.ButtonAcceptProposal
          variant="contained"
          onClick={toggleModalConfirmation}
        >
          Aceitar Proposta
        </Styled.ButtonAcceptProposal>

        <Styled.ButtonRefuseProposal
          variant="outlined"
          onClick={toggleModalRefuse}
        >
          Recusar Proposta
        </Styled.ButtonRefuseProposal>
      </Styled.DivButtons>

      <Modal open={modalConfirmationOpen} onClose={toggleModalConfirmation}>
        <Formik
          initialValues={formValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
          enableReinitialize
          innerRef={refFormik as any}
        >
          <Styled.ContainerModal>
            <Styled.AdditionalData variant="h2">
              Dados complementares
            </Styled.AdditionalData>
            <Styled.GridContainer container spacing={1}>
              <Grid item xs={4}>
                <Input
                  name="name"
                  label="Nome"
                  placeholder="Informe seu nome"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="nationality"
                  label="Nacionalidade"
                  placeholder="Informe sua nacionalidade"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="profession"
                  label="Profissão"
                  placeholder="Informe sua profissão"
                  variant="outlined"
                />
              </Grid>
            </Styled.GridContainer>

            <Styled.GridContainer container spacing={1}>
              <Grid item xs={2}>
                <Input
                  id="cep"
                  name="cep"
                  label="CEP"
                  placeholder="_____--___"
                  mask="99999-999"
                  variant="outlined"
                  onKeyUp={handleInput}
                  error={notFound}
                  helperText={notFound ? 'CEP não encontrado' : undefined}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="logradouro"
                  label="Endereço"
                  placeholder="Informe seu endereço"
                  variant="outlined"
                  disabled={
                    cep?.length !== 9 || notFound || !!address?.logradouro
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  name="number"
                  type="number"
                  label="Número"
                  placeholder="xxxx"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="bairro"
                  label="Bairro"
                  placeholder="Informe seu bairro"
                  variant="outlined"
                  disabled={cep?.length !== 9 || notFound || !!address?.bairro}
                />
              </Grid>
            </Styled.GridContainer>

            <Styled.GridContainer container spacing={1}>
              <Grid item xs={4}>
                <Input
                  name="complement"
                  label="Complemento"
                  placeholder="apto, bloco, casa"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="localidade"
                  label="Cidade"
                  placeholder="Informe sua cidade"
                  variant="outlined"
                  disabled={
                    cep?.length !== 9 || notFound || !!address?.localidade
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Styled.DivSelect>
                  <Select
                    name="uf"
                    options={ufs}
                    label="Estado"
                    placeholder="Selecione seu estado"
                    variant="outlined"
                    disabled={cep?.length !== 9 || notFound || !!address?.uf}
                  />
                </Styled.DivSelect>
              </Grid>
            </Styled.GridContainer>

            <Styled.BankData variant="h2">Dados bancários</Styled.BankData>

            <Styled.GridContainer container spacing={1}>
              <Grid item xs={3}>
                <Input
                  name="accountType"
                  type="number"
                  label="Tipo de conta"
                  placeholder="Conta corrente"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <Styled.DivSelect>
                  <Autocomplete
                    name="bankCode"
                    options={banks}
                    label="Selecione o seu banco"
                    placeholder="xxx - Meu banco"
                    variant="outlined"
                  />
                </Styled.DivSelect>
              </Grid>
            </Styled.GridContainer>

            <Styled.GridContainer container spacing={1}>
              <Grid item xs={3}>
                <Input
                  name="agency"
                  type="number"
                  label="Agência"
                  placeholder="N° da sua agência"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  name="digit"
                  type="number"
                  label="Dígito"
                  placeholder="XX"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name="accountNumber"
                  type="number"
                  label="N° da Conta Corrente"
                  placeholder="XXXXXX"
                  variant="outlined"
                />
              </Grid>
            </Styled.GridContainer>
            <Styled.ButtonToSend type="submit" variant="contained">
              Enviar
            </Styled.ButtonToSend>
          </Styled.ContainerModal>
        </Formik>
      </Modal>

      <ModalMessage
        width="685px"
        height="226px"
        open={modalSuccessOpen}
        onClose={toggleModalSuccess}
        icon={<CheckCircle color="success" />}
        text="Aceite enviado com sucesso!"
      />

      <ModalMessage
        open={modalErrorOpen}
        onClose={toggleModalError}
        icon={<Warning color="warning" />}
        text={errorMessage}
      />

      <Modal open={modalRefuseOpen} onClose={toggleModalRefuse}>
        <Styled.ContainerModalRefuseProposal>
          <Styled.RefuseProposal variant="h2">
            Tem certeza que deseja recusar a proposta?
          </Styled.RefuseProposal>

          <Styled.DivButtonsYesOrNo>
            <Styled.ButtonYes
              variant="contained"
              onClick={handleRefuseLoan}
              disabled={loading}
            >
              Sim
            </Styled.ButtonYes>

            <Styled.ButtonNo variant="outlined" onClick={toggleModalRefuse}>
              Não
            </Styled.ButtonNo>
          </Styled.DivButtonsYesOrNo>
        </Styled.ContainerModalRefuseProposal>
      </Modal>

      <Modal open={modalRefuseAcceptOpen} onClose={goToLoggedArea}>
        <Styled.ContainerModalRefuseProposalAccept>
          <Styled.CheckCircle color="success" />

          <Styled.RefuseProposalAccept variant="h2">
            Proposta recusada
          </Styled.RefuseProposalAccept>

          <Styled.ButtonGoToHomeScreen
            variant="contained"
            onClick={() => history.push(RoutingPath.LOGGEDAREA)}
          >
            Ir para tela inicial
          </Styled.ButtonGoToHomeScreen>
        </Styled.ContainerModalRefuseProposalAccept>
      </Modal>
    </Styled.Card>
  );
};
export { ApprovedLoan };
