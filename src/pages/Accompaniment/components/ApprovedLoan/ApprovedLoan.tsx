import { FC, useMemo, useEffect, useState } from 'react';
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
import { LoanDataProps } from 'pages/Accompaniment/models/loanData';
import { Autocomplete } from 'components/Autocomplete';
import useViaCEP from 'hooks/viaCEP';
import { schema } from './schema';
import * as Styled from './styles';

const ApprovedLoan: FC = () => {
  const { open: modalConfirmationOpen, toggle: toggleModalConfirmation } =
    useModal();
  const { open: modalSuccessOpen, toggle: toggleModalSuccess } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
  const [banks, setBanks] = useState<{ name: string; value: string }[]>([]);
  const [loanData, setLoanData] = useState<LoanDataProps>();
  const [tableData, setTableData] = useState<any>([]);
  const { fetchCEP, notFound, address } = useViaCEP();
  const [cep, setCep] = useState<string>();

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
      </Styled.DivButtons>

      <Modal open={modalConfirmationOpen} onClose={toggleModalConfirmation}>
        <Formik
          initialValues={{ nationality: 'Brasileira', ...address }}
          onSubmit={() => console.log('aqwui')}
          validationSchema={schema}
          enableReinitialize
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
                  disabled
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
                    disabled
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
            <Styled.ButtonToSend variant="contained">
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
        text="Erro"
      />
    </Styled.Card>
  );
};
export { ApprovedLoan };
