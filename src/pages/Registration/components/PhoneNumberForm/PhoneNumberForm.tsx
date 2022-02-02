import React from 'react';

import { Formik } from 'components/Formik';
import { ContinueButton } from '../ContinueButton';
import { StepSmallTitle } from '../StepSmallTitle';

import { schema } from './schema';

import * as Styled from './styles';
import { PhoneNumberFormProps } from './props';

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({ onSubmit }) => (
  <Formik
    initialValues={{ phoneNumber: '' }}
    validationSchema={schema}
    onSubmit={onSubmit}
    name="phoneNumber-form"
  >
    <StepSmallTitle>Qual o seu celular?</StepSmallTitle>

    <Styled.PhonenumberInput
      name="phoneNumber"
      type="text"
      label="Digite o número do seu telefone"
      placeholder="(XX)XXXXX-XXXX"
      variant="outlined"
      mask="(99)99999-9999"
      inputProps={{ 'data-testid': 'phoneNumber' }}
      FormHelperTextProps={{
        id: 'error',
      }}
    />

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { PhoneNumberForm };
