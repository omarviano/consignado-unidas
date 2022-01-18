import React from 'react';

import { Formik } from 'components/Formik';
import { PasswordRules } from 'components/PasswordRules';
import { ContinueButton } from '../ContinueButton';
import { StepSmallTitle } from '../StepSmallTitle';

import { schema } from './schema';
import * as Styled from './styles';
import { PasswordFormProps } from './props';

const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmit }) => (
  <Formik
    initialValues={{ password: '', passwordConfirmation: '' }}
    validationSchema={schema}
    onSubmit={onSubmit}
  >
    <StepSmallTitle>Criar senha</StepSmallTitle>

    <Styled.PasswordInput
      name="password"
      type="password"
      label="Cadastre uma senha"
      placeholder="Cadastre um senha"
      variant="outlined"
    />

    <Styled.PasswordInput
      name="passwordConfirmation"
      type="password"
      label="Confirme sua senha"
      placeholder="Confirme sua senha"
      variant="outlined"
    />

    <PasswordRules containerStyles={{ marginTop: 32 }} />

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { PasswordForm };
