import React from 'react';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { ContinueButton } from '../ContinueButton';
import { StepSmallTitle } from '../StepSmallTitle';

import { schema } from './schema';
import { PasswordFormProps } from './props';

const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
    <StepSmallTitle>Criar senha</StepSmallTitle>

    <Input
      name="password"
      type="password"
      label="Cadastre uma senha"
      placeholder="Cadastre um senha"
      variant="outlined"
    />

    <Input
      name="passwordConfirmation"
      type="password"
      label="Confirme sua senha"
      placeholder="Confirme sua senha"
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

export { PasswordForm };
