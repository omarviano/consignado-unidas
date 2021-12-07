import React, { useEffect, useState } from 'react';
import { ArrowRightAlt } from '@mui/icons-material';
import { Grid } from '@mui/material';

import useViaCEP from 'hooks/viaCEP';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { Select } from 'components/Select/Select';
import { Autocomplete } from 'components/Autocomplete';
import { RegistrationServices } from 'pages/Registration/services/registration.services';
import { Bank } from 'pages/Registration/models/bank';

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

  const handleInput = () => {
    const cepInput = document.getElementById('zipCode') as HTMLInputElement;

    setCep(cepInput?.value);
  };

  const handleSubmit = data => {
    const { zipCode, logradouro, bairro, localidade, uf } = data;

    onSubmit({
      ...data,
      zipCode: Document.removeMask(zipCode),
      publicPlace: logradouro,
      district: bairro,
      city: localidade,
      state: uf,
    });
  };

  useEffect(() => {
    RegistrationServices.fetchBanks().then(({ data }) => {
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

  return (
    <Formik
      initialValues={{ nationality: 'Brasileira', ...address }}
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Styled.BankDataContainer>
        <Styled.Hello>Olá {username}!</Styled.Hello>
        <Styled.Email>{email}</Styled.Email>

        <Styled.Title>
          Você deseja informar algumas informações sobre você?
        </Styled.Title>

        <Styled.DataContainer>
          <Input
            name="professional"
            label="Profissão (Opcional)"
            placeholder="Informe sua profissão"
            variant="outlined"
          />

          <Input
            name="nationality"
            label="Nacionalidade (Opcional)"
            placeholder="Informe sua nacionalidade"
            variant="outlined"
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
          />

          <Input
            name="logradouro"
            label="Endereço (Opcional)"
            placeholder="Informe seu endereço"
            variant="outlined"
            disabled={cep?.length !== 9 || notFound || !!address?.logradouro}
          />

          <Styled.Div>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Input
                  name="number"
                  type="number"
                  label="Número (Opcional)"
                  placeholder="xxxx"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  name="bairro"
                  label="Bairro (Opcional)"
                  placeholder="Informe seu bairro"
                  variant="outlined"
                  disabled={cep?.length !== 9 || notFound || !!address?.bairro}
                />
              </Grid>
            </Grid>
          </Styled.Div>

          <Input
            name="complement"
            label="Complemento"
            placeholder="Informe o complemento"
            variant="outlined"
          />

          <Input
            name="localidade"
            label="Cidade (Opcional)"
            placeholder="Informe a cidade que você mora"
            variant="outlined"
            disabled
          />

          <Styled.Div>
            <Select
              name="uf"
              options={ufs}
              label="Estado (Opcional)"
              placeholder="Selecione seu estado"
              variant="outlined"
              disabled
            />
          </Styled.Div>
        </Styled.DataContainer>

        <Styled.Title>
          Você deseja informar os dados bancários para futuros empréstimos?
        </Styled.Title>
        <Styled.BankDetailsConfirmationText>
          Caso você não queira preeencher os dados, não se preocupe, poderá
          cadsatrar em um outro momento ok? Lembrando que para esta operação,{' '}
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
            />
          </Styled.Div>

          <Styled.Div>
            <Styled.AgencyInput
              name="agency"
              type="number"
              label="Agência"
              placeholder="N° da sua agência"
              variant="outlined"
            />
          </Styled.Div>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Styled.AccountInput
                name="accountNumber"
                type="number"
                label="N° da Conta Corrente"
                placeholder="XXXXXX"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={4}>
              <Styled.DigitInput
                name="digit"
                type="number"
                label="Dígito"
                placeholder="XX"
                variant="outlined"
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
