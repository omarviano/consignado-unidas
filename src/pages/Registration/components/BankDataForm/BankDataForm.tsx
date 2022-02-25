import React, { useEffect, useState, useRef } from 'react';
import { ArrowRightAlt } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { FormikProps } from 'formik';

import useViaCEP from 'hooks/useViaCEP';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { Select } from 'components/Select/Select';
import { Autocomplete } from 'components/Autocomplete';
import { RegistrationServices } from 'pages/Registration/services/registration.services';

import ufs from 'constants/ufs';
import { Document } from 'utils/document';
import { schema } from './schema';

import * as Styled from './styles';
import { BankDataFormProps } from './props';

const BankDataForm: React.FC<BankDataFormProps> = ({
  submitting,
  onSubmit,
  username,
  email,
}) => {
  const [banks, setBanks] = useState<{ name: string; value: string }[]>([]);
  const [cep, setCep] = useState<string>();
  const { fetchCEP, notFound, address } = useViaCEP();
  const formRef = useRef<FormikProps<any>>(null);
  const [formValues, setFormValues] = useState({
    professional: '',
    nationality: 'Brasileiro',
    zipCode: '',
    logradouro: '',
    number: '',
    bairro: '',
    complement: '',
    localidade: '',
    uf: '',
    accountType: '',
    bankCode: '',
    agency: '',
    accountNumber: '',
    digit: '',
  });

  const handleInput = () => {
    const cepInput = document.getElementById('zipCode') as HTMLInputElement;

    setCep(cepInput?.value);
  };

  const handleSubmit = data => {
    const { zipCode, logradouro, bairro, localidade, uf } = data;

    onSubmit({
      ...data,
      zipCode: zipCode ? Document.removeMask(zipCode) : undefined,
      publicPlace: logradouro,
      district: bairro,
      city: localidade,
      state: uf,
    });
  };

  useEffect(() => {
    RegistrationServices.fetchBanks().then(({ data: { data = [] } }) => {
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

  useEffect(() => {
    setFormValues({
      nationality: 'Brasileiro',
      ...formRef.current?.values,
    });
  }, [address]);

  return (
    <Formik
      initialValues={{ ...formValues, ...address }}
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
      innerRef={formRef}
    >
      <Styled.BankDataContainer>
        <Styled.Hello id="username">Olá {username}!</Styled.Hello>
        <Styled.Email id="email">{email}</Styled.Email>

        <Styled.Title>
          Você deseja informar algumas informações sobre você?
        </Styled.Title>

        <Styled.DataContainer>
          <Input
            name="professional"
            label="Profissão (Opcional)"
            placeholder="Informe sua profissão"
            variant="outlined"
            inputProps={{ 'data-testid': 'professional', role: 'textbox' }}
            FormHelperTextProps={{
              id: 'professional-error',
            }}
          />

          <Input
            name="nationality"
            label="Nacionalidade (Opcional)"
            placeholder="Informe sua nacionalidade"
            variant="outlined"
            inputProps={{ 'data-testid': 'nationality', role: 'textbox' }}
            FormHelperTextProps={{
              id: 'nationality-error',
            }}
          />

          <Input
            id="zipCode"
            name="zipCode"
            label="CEP (Opcional)"
            placeholder="_____-___"
            mask="99999-999"
            variant="outlined"
            onKeyUp={handleInput}
            error={notFound}
            helperText={notFound ? 'CEP não encontrado' : undefined}
            inputProps={{ 'data-testid': 'zipCode', role: 'textbox' }}
            FormHelperTextProps={{
              id: 'zipCode-error',
            }}
          />

          <Input
            name="logradouro"
            label="Endereço (Opcional)"
            placeholder="Informe seu endereço"
            variant="outlined"
            disabled={cep?.length !== 9 || notFound || !!address?.logradouro}
            inputProps={{ 'data-testid': 'logradouro', role: 'textbox' }}
            FormHelperTextProps={{
              id: 'logradouro-error',
            }}
          />

          <Styled.Div>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Input
                  name="number"
                  label="Número (Opcional)"
                  placeholder="xxxx"
                  variant="outlined"
                  inputProps={{ 'data-testid': 'number', role: 'textbox' }}
                  FormHelperTextProps={{
                    id: 'number-error',
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  name="bairro"
                  label="Bairro (Opcional)"
                  placeholder="Informe seu bairro"
                  variant="outlined"
                  disabled={cep?.length !== 9 || notFound || !!address?.bairro}
                  inputProps={{ 'data-testid': 'bairro', role: 'textbox' }}
                  FormHelperTextProps={{
                    id: 'bairro-error',
                  }}
                />
              </Grid>
            </Grid>
          </Styled.Div>

          <Input
            name="complement"
            label="Complemento (Opcional)"
            placeholder="Informe o complemento"
            variant="outlined"
            inputProps={{ 'data-testid': 'complement', role: 'textbox' }}
            FormHelperTextProps={{
              id: 'complement-error',
            }}
          />

          <Input
            name="localidade"
            label="Cidade (Opcional)"
            placeholder="Informe a cidade que você mora"
            variant="outlined"
            disabled
            inputProps={{ 'data-testid': 'localidade', role: 'textbox' }}
            FormHelperTextProps={{
              id: 'localidade-error',
            }}
          />

          <Styled.Div>
            <Select
              name="uf"
              options={ufs}
              label="Estado (Opcional)"
              placeholder="Selecione seu estado"
              variant="outlined"
              disabled
              inputProps={{ 'data-testid': 'uf', role: 'textbox' }}
              FormHelperTextProps={{
                id: 'uf-error',
              }}
            />
          </Styled.Div>
        </Styled.DataContainer>

        <Styled.Title>
          Você deseja informar os dados bancários para futuros empréstimos?
        </Styled.Title>
        <Styled.BankDetailsConfirmationText>
          Caso você não queira preeencher os dados, não se preocupe, poderá
          cadastrar em um outro momento ok? Lembrando que para esta operação,{' '}
          <b>só é possível utilizar conta corrente e de sua titularidade.</b>.
        </Styled.BankDetailsConfirmationText>

        <Styled.BankDataInputs>
          <Input
            name="accountType"
            type="number"
            label="Tipo de conta"
            placeholder="Conta corrente"
            variant="outlined"
            disabled
          />

          <Styled.Div>
            <Autocomplete
              name="bankCode"
              options={banks}
              label="Banco"
              variant="outlined"
              inputProps={{ 'data-testid': 'bankCode', role: 'textbox' }}
              FormHelperTextProps={{
                id: 'bankCode-error',
              }}
            />
          </Styled.Div>

          <Styled.Div>
            <Styled.AgencyInput
              name="agency"
              label="Agência"
              placeholder="N° da sua agência"
              variant="outlined"
              inputProps={{ 'data-testid': 'agency' }}
              FormHelperTextProps={{
                id: 'agency-error',
              }}
            />
          </Styled.Div>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Styled.AccountInput
                name="accountNumber"
                label="N° da Conta Corrente"
                placeholder="XXXXXX"
                variant="outlined"
                inputProps={{ 'data-testid': 'accountNumber' }}
                FormHelperTextProps={{
                  id: 'accountNumber-error',
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <Styled.DigitInput
                name="digit"
                label="Dígito"
                placeholder="XX"
                variant="outlined"
                inputProps={{ 'data-testid': 'digit' }}
                FormHelperTextProps={{
                  id: 'digit-error',
                }}
              />
            </Grid>
          </Grid>
        </Styled.BankDataInputs>

        <Styled.SubmitButton
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {submitting ? 'Finalizando' : 'Finalizar cadastro '}
          <ArrowRightAlt />
        </Styled.SubmitButton>
      </Styled.BankDataContainer>
    </Formik>
  );
};

export { BankDataForm };
