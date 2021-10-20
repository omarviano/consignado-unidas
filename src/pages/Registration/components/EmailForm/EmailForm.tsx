import React from 'react';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton';

import { schema } from './schema';
import { EmailFormProps } from './props';

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
    <StepSmallTitle>Qual o seu melhor email?</StepSmallTitle>

    <Input
      name="email"
      type="text"
      label="Seu melhor email"
      placeholder="Seu melhor email"
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

export { EmailForm };
