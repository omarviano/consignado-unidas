import { FC, useMemo, useEffect, useState, useRef } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { formatDate } from 'utils/formatDate';
import { formatValue } from 'utils/formatValue';
import { Table } from 'components/Table';
import useModal from 'hooks/useModal';
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
import useViaCEP from 'hooks/useViaCEP';
import { AxiosError } from 'axios';
import { Document } from 'utils/document';
import { FormikProps } from 'formik';
import { Button } from 'components/Buttons/Button';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { UserDataProps, FormProps } from '../../models/userData';
import { schema, reasonsSchema } from './schema';
import { InstallmentCard } from './components/InstallmentCard';
import * as Styled from './styles';
import { InstallmentTableDataProps } from './components/InstallmentCard/props';

import { ApprovedLoanProps } from './props';

const ApprovedLoan: FC<ApprovedLoanProps> = ({ onApproved }) => {
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
  const [errorMessage, setErrorMessage] = useState<string>('ERROR');
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
          nationality: response?.nationality || 'Brasileiro',
          professional: response?.professional,
          number: response?.number,
          complement: response?.complement,
          bankCode: String(response?.bankCode),
          agency: response?.agency,
          digit: response?.digit,
          accountNumber: response?.accountNumber,
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

  const totalTextAreaCharacters = () => {
    const textarea = document.getElementById(
      'reasonDescription',
    ) as HTMLInputElement;

    return textarea?.value?.length || 0;
  };

  const handleInputTextArea = () => {
    setTotalCharacters(totalTextAreaCharacters());
  };

  const handleSelectReason = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const {
      target: { value },
    } = e;

    const reasonSelected = reasons.find(reason => reason.value === value);
    setReasonDescriptionRequired(!!reasonSelected?.required);
  };

  const displayValue = (data?: string | null) => {
    if (!data) return '-';

    return data;
  };

  const formatPercent = (value?: number) =>
    value ? `${value.toFixed(2)}%` : '-';

  const formatValueTwoDecimalPlaces = (value?: number) => {
    if (value === undefined) return '-';
    return value.toString().padStart(2, '0');
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
        id: loanData?.installmentQuantity || 0,
        valueFormatted: displayValue(
          formatValue(Number(loanData?.installmentValue)),
        ),
        effectiveCostPerYearFormatted: formatPercent(
          loanData?.installmentEffectiveCostPerYear,
        ),
        feesPerMonthFormatted: formatPercent(loanData?.installmentFeesPerMonth),
        quantityFormatted: formatValueTwoDecimalPlaces(
          loanData?.installmentQuantity,
        ),
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
      setErrorMessage(response?.data?.message);
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
    if (reasonDescriptionRequired && totalTextAreaCharacters() === 0) return;

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
      setErrorMessage(response?.data?.message);
      toggleModalError();
    } finally {
      setLoading(false);
    }
  };

  const goToLoggedArea = () => {
    toggleModalRefuseAccept();
    history.push(RoutingPath.LOGGEDAREA);
  };

  const handleCloseApprovedModal = () => {
    onApproved();
    toggleModalSuccess();
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

  const content = () =>
    width && width > 920 ? (
      <Table
        disableBoxShadow
        checkboxSelection={false}
        columns={columns}
        rows={tableData}
      />
    ) : (
      <InstallmentCard data={tableData} />
    );

  const inputCepHelperText = () =>
    notFound ? 'CEP não encontrado' : undefined;

  const addressInputDisabled = (data?: string) =>
    cep?.length !== 9 || notFound || !!data;

  const submitButtonText = (text: string, loadingText: string) =>
    loading ? loadingText : text;

  const reasonPlaceholder = () =>
    reasonDescriptionRequired
      ? 'Por favor, descreva porque você está recusando'
      : 'Caso queira, descrever mais sobre o motivo... ';

  const reasonError = () => reasonDescriptionRequired && totalCharacters === 0;

  const reasonHelperText = () =>
    reasonDescriptionRequired && totalCharacters === 0
      ? 'Campo Obrigatório'
      : undefined;

  return (
    <Styled.Card data-testid="approvedLoan">
      <Styled.LoanInformation variant="h2">
        Olá {getToken()?.user.name}! Tudo bem? Temos uma ótima notícia! <br /> A
        sua proposta de empréstimo foi{' '}
        <Styled.Approved data-testid="approvedText">
          {displayValue(loanData?.quotationStatus?.description)}
        </Styled.Approved>
        !
      </Styled.LoanInformation>

      <Styled.TotalAmountOfLoanRequested variant="h2">
        Valor total do empréstimo solicitado:{' '}
        <Styled.TextBlack data-testid="value">
          {displayValue(formatValue(Number(loanData?.value)))}
        </Styled.TextBlack>
      </Styled.TotalAmountOfLoanRequested>

      <Styled.InstallmentDueDate variant="h2">
        Data de Vencimento da 1ª parcela:{' '}
        <Styled.TextBlack data-testid="dueDate">
          {displayValue(formatDate(loanData?.dueDate))}
        </Styled.TextBlack>
      </Styled.InstallmentDueDate>

      <Styled.ProposalInformation variant="h6">
        Esta proposta será válida em até 7 dias e está sujeita a alterações de
        acordo com a data do aceite.
      </Styled.ProposalInformation>

      {content()}

      <Styled.DivButtons>
        <Styled.ButtonAcceptProposal
          variant="contained"
          onClick={toggleModalConfirmation}
          data-testid="acceptProposalButton"
        >
          Aceitar Proposta
        </Styled.ButtonAcceptProposal>

        <Styled.ButtonRefuseProposal
          variant="outlined"
          onClick={toggleModalRefuse}
          data-testid="refuseProposalButton"
        >
          Recusar Proposta
        </Styled.ButtonRefuseProposal>
      </Styled.DivButtons>

      <Modal open={modalConfirmationOpen} onClose={toggleModalConfirmation}>
        <Formik
          initialValues={{
            ...userData,
          }}
          onSubmit={handleSubmit}
          validationSchema={schema}
          enableReinitialize
          innerRef={refFormik as any}
          validateOnMount
        >
          <Styled.ContainerModal data-testid="confirmationModal">
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
                  helperText={inputCepHelperText()}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Input
                  name="logradouro"
                  label="Endereço"
                  placeholder="Informe seu endereço"
                  variant="outlined"
                  disabled={addressInputDisabled(address?.logradouro)}
                  value={address?.logradouro}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Input
                  name="number"
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
                  disabled={addressInputDisabled(address?.bairro)}
                  value={address?.bairro}
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
                  disabled={addressInputDisabled(address?.localidade)}
                  value={address?.localidade}
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
                    disabled={addressInputDisabled(address?.uf)}
                    value={address?.uf}
                  />
                </Styled.DivSelect>
              </Grid>
            </Styled.GridContainer>

            <Styled.BankData variant="h2">Dados bancários</Styled.BankData>

            <Styled.GridContainer container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Input
                  name="accountType"
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
                  label="Agência"
                  placeholder="N° da sua agência"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Input
                  name="accountNumber"
                  label="N° da Conta Corrente"
                  placeholder="XXXXXX"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Input
                  name="digit"
                  label="Dígito"
                  placeholder="XX"
                  variant="outlined"
                />
              </Grid>
            </Styled.GridContainer>
            <Styled.ButtonToSend
              type="submit"
              variant="contained"
              disabled={loading}
              data-testid="confirmationButton"
            >
              {submitButtonText('Enviar', 'Enviando...')}
            </Styled.ButtonToSend>
          </Styled.ContainerModal>
        </Formik>
      </Modal>

      <ModalMessage
        width="685px"
        height="226px"
        open={modalSuccessOpen}
        onClose={handleCloseApprovedModal}
        icon={<CheckCircle color="success" data-testid="modal-success" />}
        text="Aceite enviado com sucesso!"
      />

      <ModalMessage
        open={modalErrorOpen}
        onClose={toggleModalError}
        icon={<Warning color="warning" />}
        text={errorMessage}
      />

      <Modal open={modalRefuseOpen} onClose={toggleModalRefuse}>
        <Styled.ContainerModalRefuseProposal data-testid="refuseProposalModal">
          <Styled.RefuseProposal variant="h2">
            Tem certeza que deseja recusar a proposta?
          </Styled.RefuseProposal>

          <Styled.DivButtonsYesOrNo>
            <Styled.ButtonYes
              variant="contained"
              onClick={handleRefuseLoan}
              disabled={loading}
              data-testid="confirmRefuse"
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
        <Styled.ContainerModalRefuseProposalAccept data-testid="refuseAcceptedModal">
          <Styled.CheckCircle color="success" />

          <Styled.RefuseProposalAccept variant="h2">
            Proposta recusada <br /> Agradecemos por ter respondido o
            questionário. <br /> As respostas contribuiram para nossas futuras
            melhorias.
          </Styled.RefuseProposalAccept>

          <Styled.ButtonGoToHomeScreen
            variant="contained"
            onClick={() => history.push(RoutingPath.LOGGEDAREA)}
            data-testid="button-go-to-home"
          >
            Ir para tela inicial
          </Styled.ButtonGoToHomeScreen>
        </Styled.ContainerModalRefuseProposalAccept>
      </Modal>

      <Modal open={reasonRefusesOpen} onClose={toggleReasonRefuses}>
        <Styled.ReasonRefusesModal data-testid="refuseModalForm">
          <Styled.ReasonRefusesModalTitle>
            Deseja nos informar o motivo pelo qual você recusou a proposta?{' '}
          </Styled.ReasonRefusesModalTitle>

          <Formik
            initialValues={{ reasonRefuseId: '' }}
            validationSchema={reasonsSchema}
            onSubmit={handleReasonSubmit}
          >
            <Select
              name="reasonRefuseId"
              label="Selecione um motivo"
              options={reasons}
              variant="outlined"
              onChange={handleSelectReason}
              inputProps={{ 'data-testid': 'reasonRefuseId', role: 'textbox' }}
              FormHelperTextProps={{
                id: 'reasonRefuseId-error',
              }}
            />

            <Input
              id="reasonDescription"
              name="reasonDescription"
              label=""
              placeholder={reasonPlaceholder()}
              variant="outlined"
              multiline
              rows={8}
              inputProps={{
                maxLength: 300,
                'data-testid': 'reasonDescription',
              }}
              onInput={handleInputTextArea}
              error={reasonError()}
              helperText={reasonHelperText()}
            />
            <Styled.TotalCharacters data-testid="totalCharacters">
              Máximo de carateres {totalCharacters}/300
            </Styled.TotalCharacters>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              data-testid="refuseButton"
            >
              {submitButtonText('Enviar', 'Enviando...')}
            </Button>
          </Formik>
        </Styled.ReasonRefusesModal>
      </Modal>
    </Styled.Card>
  );
};
export { ApprovedLoan };
