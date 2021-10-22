import React from 'react';

import { Formik } from 'components/Formik';
import { ContinueButton } from '../ContinueButton';
import { StepSmallTitle } from '../StepSmallTitle';

import { schema } from './schema';

import * as Styled from './styles';
import { CompleteNameFormProps } from './props';

const CompleteNameForm: React.FC<CompleteNameFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
    <StepSmallTitle>Qual o seu nome completo?</StepSmallTitle>

    <Styled.NameInput
      name="name"
      type="text"
      label="Digite seu nome completo"
      placeholder="Digite seu nome completo"
      variant="outlined"
    />

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { CompleteNameForm };
