import React from 'react';

import { Formik } from 'components/Formik';
import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton';

import { schema } from './schema';

import * as Styled from './styles';
import { EmailFormProps } from './props';

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => (
  <Formik
    initialValues={{ email: '' }}
    validationSchema={schema}
    onSubmit={onSubmit}
    validateOnBlur={false}
    validateOnChange
  >
    <StepSmallTitle>Qual o seu melhor e-mail?</StepSmallTitle>

    <Styled.EmailInput
      name="email"
      type="text"
      label="Seu melhor e-mail"
      placeholder="Seu melhor e-mail"
      variant="outlined"
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

export { EmailForm };
