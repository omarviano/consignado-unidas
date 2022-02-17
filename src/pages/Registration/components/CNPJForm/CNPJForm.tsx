import React from 'react';

import { Formik } from 'components/Formik';

import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton';

import { CNPJFormProps } from './props';
import { schema } from './schema';
import * as Styled from './styles';

const CNPJForm: React.FC<CNPJFormProps> = ({ data, onSubmit }) => (
  <Formik
    initialValues={{ ...data, cnpj: '' }}
    onSubmit={onSubmit}
    validationSchema={schema}
    validateOnBlur={false}
    validateOnChange
    validateOnMount
    name="cnpj-form"
    enableReinitialize
  >
    <StepSmallTitle>CNPJ da empresa</StepSmallTitle>
    <Styled.Text>
      Você pode encontrar o CNPJ da empresa no seu contracheque.
    </Styled.Text>

    <Styled.CNPJContainer>
      <Styled.CPFInput name="cpf" type="text" label="" variant="outlined" />

      <Styled.CNPJInput
        name="cnpj"
        type="text"
        label="CNPJ da empresa"
        placeholder="Digite o CNPJ da empresa"
        variant="outlined"
        mask="99.999.999/9999-99"
        inputProps={{ 'data-testid': 'cnpj' }}
        FormHelperTextProps={{
          id: 'cnpj-error',
        }}
      />
    </Styled.CNPJContainer>

    <ContinueButton
      type="submit"
      data-testid="submit-button"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { CNPJForm };
