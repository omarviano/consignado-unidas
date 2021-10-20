import React from 'react';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { ContinueButton } from '../ContinueButton';
import { StepSmallTitle } from '../StepSmallTitle';

import { schema } from './schema';

import { CompleteNameFormProps } from './props';

const CompleteNameForm: React.FC<CompleteNameFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
    <StepSmallTitle>Qual o seu nome completo?</StepSmallTitle>

    <Input
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
