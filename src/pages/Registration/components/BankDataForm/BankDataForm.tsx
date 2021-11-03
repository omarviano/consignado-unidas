import React, { useEffect, useState } from 'react';
import { ArrowRightAlt } from '@mui/icons-material';
import { Grid } from '@mui/material';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { Select } from 'components/Select/Select';
import { RegistrationServices } from 'pages/Registration/services/registration.services';
import { Bank } from 'pages/Registration/models/bank';

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

  return (
    <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
      <Styled.BankDataContainer>
        <Styled.Hello>Olá {username}!</Styled.Hello>
        <Styled.Email>{email}</Styled.Email>

        <Styled.BankDetailsConfirmationTitle>
          Você deseja informar os dados bancários para futuros empréstimos?
        </Styled.BankDetailsConfirmationTitle>
        <Styled.BankDetailsConfirmationText>
          Caso você não queira preeencher os dados, não se preocupe, poderá
          cadsatrar em um outro momento ok? Lembrando que para esta operação,{' '}
          <b>só é possível utilizar conta corrente</b>.
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

          <Select
            name="bankCode"
            options={banks}
            label="Banco"
            variant="outlined"
          />

          <Styled.AgencyInput
            name="agency"
            type="number"
            label="Agência"
            placeholder="N° da sua agência"
            variant="outlined"
          />

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
