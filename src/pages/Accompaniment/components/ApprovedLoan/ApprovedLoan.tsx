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
import { AccompanimentServices } from 'pages/Accompaniment/services/accompaniment.services';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from 'utils/routing';
import { LoanDataProps } from 'pages/Accompaniment/models/loanData';
import { Autocomplete } from 'components/Autocomplete';
import useViaCEP from 'hooks/viaCEP';
import { AxiosError } from 'axios';
import { Document } from 'utils/document';
import { FormikProps } from 'formik';
import { Button } from 'components/Buttons/Button';
import useWindowDimensions from 'hooks/windowDimensions';
import { UserDataProps, FormProps } from '../../models/userData';
import { schema, reasonsSchema } from './schema';
import { InstallmentCard } from './components/InstallmentCard';
import * as Styled from './styles';
import { InstallmentTableDataProps } from './components/InstallmentCard/props';

const ApprovedLoan: FC = () => {
  const history = useHistory();
  const { open: modalConfirmationOpen, toggle: toggleModalConfirmation } =
    useModal();
  const { open: modalSuccessOpen, toggle: toggleModalSuccess } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
  const { open: modalRefuseOpen, toggle: toggleModalRefuse } = useModal();
  const { open: modalRefuseAcceptOpen, toggle: toggleModalRefuseAccept } =
    useModal();
  const { open: reasonRefusesOpen, toggle: toggleReasonRefuses } = useModal();
  const [banks, setBanks] = useState<{ name: string; value: string }[]>([]);
  const [loanData, setLoanData] = useState<LoanDataProps>();
  const [tableData, setTableData] = useState<InstallmentTableDataProps[]>([]);
  const { fetchCEP, notFound, address } = useViaCEP();
  const [cep, setCep] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [userData, setUserData] = useState<FormProps>();
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [reasons, setReasons] = useState<
    { name: string; value: string; required: boolean }[]
  >([]);
  const [reasonDescriptionRequired, setReasonDescriptionRequired] =
    useState(false);
  const { width } = useWindowDimensions();

  const refFormik = useRef<FormikProps<FormProps> | null>();

  useEffect(() => {
    AccompanimentServices.fetchUserData().then(
      ({ data: { data: response } }) => {
        setUserData({
          name: response?.name,
          nationality: response?.nationality,
          professional: response?.professional,
          number: Number(response?.number),
          complement: response?.complement,
          bankCode: String(response?.bankCode),
          agency: Number(response?.agency),
          digit: Number(response?.digit),
          accountNumber: Number(response?.accountNumber),
          cep: response?.zipCode,
          logradouro: response?.publicPlace,
          bairro: response?.district,
          localidade: response?.city,
          uf: response?.state,
        });
      },
    );
  }, []);

  useEffect(() => {
    if (userData?.cep) {
      fetchCEP(userData.cep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.cep]);

  const handleInput = () => {
    const cepInput = document.getElementById('cep') as HTMLInputElement;
    setCep(cepInput?.value);
  };

  const handleInputTextArea = () => {
    const textarea = document.getElementById(
      'reasonDescription',
    ) as HTMLInputElement;

    setTotalCharacters(textarea?.value?.length);
  };

  const handleSelectReason = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const {
      target: { value },
    } = e;

    const reasonSelected = reasons.find(reason => reason.value === value);
    setReasonDescriptionRequired(reasonSelected?.required || false);
  };

  useEffect(() => {
    AccompanimentServices.checkCreditUnderReview().then(
      ({ data: { data } }) => {
        setLoanData(data);
      },
    );

    AccompanimentServices.fetchReasons().then(({ data: { data } }) =>
      setReasons(
        data.map(reason => ({
          name: reason.description,
          value: reason.id.toString(),
          required: reason.required,
        })),
      ),
    );
  }, []);

  useEffect(() => {
    const data = [
      {
        id: Math.random(),
        valueFormatted: loanData?.installmentValue
          ? formatValue(Number(loanData?.installmentValue))
          : '-',
        effectiveCostPerYearFormatted: loanData?.installmentEffectiveCostPerYear
          ? `${loanData?.installmentEffectiveCostPerYear}%`
          : '-',
        feesPerMonthFormatted: loanData?.installmentFeesPerMonth
          ? `${loanData?.installmentFeesPerMonth?.toFixed(2)}%`
          : '-',
        quantityFormatted: loanData?.installmentQuantity
          ? loanData?.installmentQuantity?.toString().padStart(2, '0')
          : '-',
      },
    ];

    setTableData(data);
  }, [loanData]);

  useEffect(() => {
    AccompanimentServices.fetchBanks().then(({ data: { data } }) => {
      setBanks(
        data.map(item => ({
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
        professional: data?.professional,
        number: data?.number,
        complement: data?.complement,
        bankCode: data?.bankCode,
        agency: data?.agency,
        digit: data?.digit,
        accountNumber: data?.accountNumber,
        accountType: 'Conta corrente',
        zipCode: `${Document.removeMask(data?.cep)}`,
        publicPlace: data?.logradouro,
        district: data?.bairro,
        city: data?.localidade,
        state: data?.uf,
      };

      await AccompanimentServices.approveLoan(dataSubmit, Number(loanData?.id));

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

  const handleRefuseLoan = () => {
    toggleModalRefuse();
    toggleReasonRefuses();
  };

  const handleReasonSubmit = data => {
    if (reasonDescriptionRequired && totalCharacters === 0) return;

    refuseLoan(data);
  };

  const refuseLoan = async (data): Promise<void> => {
    try {
      setLoading(true);

      await AccompanimentServices.refuseLoan({
        quotationId: loanData?.id,
        ...data,
      });

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
        sua proposta de empréstimo foi{' '}
        <Styled.Approved>
          {loanData?.quotationStatus?.description || '-'}
        </Styled.Approved>
        !
      </Styled.LoanInformation>

      <Styled.TotalAmountOfLoanRequested variant="h2">
        Valor total do empréstimo solicitado:{' '}
        <Styled.TextBlack>
          {loanData?.value ? formatValue(Number(loanData?.value)) : 'R$ -'}
        </Styled.TextBlack>
      </Styled.TotalAmountOfLoanRequested>

      <Styled.InstallmentDueDate variant="h2">
        Data de Vencimento da 1ª parcela:{' '}
        <Styled.TextBlack>
          {loanData?.dueDate ? formatDate(loanData?.dueDate) : '-'}
        </Styled.TextBlack>
      </Styled.InstallmentDueDate>

      <Styled.ProposalInformation variant="h6">
        Esta proposta será válida em até 15 dias e está sujeita a alterações de
        acordo com a data do aceite.
      </Styled.ProposalInformation>

      {width && width > 920 ? (
        <Table
          disableBoxShadow
          checkboxSelection={false}
          columns={columns}
          rows={tableData}
        />
      ) : (
        <InstallmentCard data={tableData} />
      )}
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
          initialValues={{
            ...userData,
            ...refFormik.current?.values,
            ...address,
          }}
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
              <Grid item xs={12} sm={4}>
                <Input
                  name="name"
                  label="Nome"
                  placeholder="Informe seu nome"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Input
                  name="nationality"
                  label="Nacionalidade"
                  placeholder="Informe sua nacionalidade"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Input
                  name="professional"
                  label="Profissão"
                  placeholder="Informe sua profissão"
                  variant="outlined"
                />
              </Grid>
            </Styled.GridContainer>

            <Styled.GridContainer container spacing={1}>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
                <Input
                  name="number"
                  type="number"
                  label="Número"
                  placeholder="xxxx"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={4}>
                <Input
                  name="complement"
                  label="Complemento"
                  placeholder="apto, bloco, casa"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={6}>
                <Input
                  name="accountType"
                  type="number"
                  label="Tipo de conta"
                  placeholder="Conta corrente"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={6} sm={4}>
                <Input
                  name="agency"
                  type="number"
                  label="Agência"
                  placeholder="N° da sua agência"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Input
                  name="digit"
                  type="number"
                  label="Dígito"
                  placeholder="XX"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Input
                  name="accountNumber"
                  type="number"
                  label="N° da Conta Corrente"
                  placeholder="XXXXXX"
                  variant="outlined"
                />
              </Grid>
            </Styled.GridContainer>
            <Styled.ButtonToSend
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar'}
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

      <Modal open={reasonRefusesOpen} onClose={toggleReasonRefuses}>
        <Styled.ReasonRefusesModal>
          <Styled.ReasonRefusesModalTitle>
            Deseja nos informar o motivo pelo qual você recusou a proposta?{' '}
          </Styled.ReasonRefusesModalTitle>

          <Formik
            initialValues={{}}
            validationSchema={reasonsSchema}
            onSubmit={handleReasonSubmit}
          >
            <Select
              name="reasonRefuseId"
              label="Selecione um motivo"
              options={reasons}
              variant="outlined"
              onChange={handleSelectReason}
            />

            <Input
              id="reasonDescription"
              name="reasonDescription"
              label=""
              placeholder={
                reasonDescriptionRequired
                  ? 'Por favor, descreva porque você está recusando'
                  : 'Caso queira, descrever mais sobre o motivo... '
              }
              variant="outlined"
              multiline
              rows={8}
              inputProps={{
                maxLength: 100,
              }}
              onInput={handleInputTextArea}
              error={reasonDescriptionRequired && totalCharacters === 0}
              helperText={
                reasonDescriptionRequired && totalCharacters === 0
                  ? 'Campo Obrigatório'
                  : undefined
              }
            />
            <Styled.TotalCharacters>
              Máximo de carateres {totalCharacters}/100
            </Styled.TotalCharacters>

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </Formik>
        </Styled.ReasonRefusesModal>
      </Modal>
    </Styled.Card>
  );
};
export { ApprovedLoan };
