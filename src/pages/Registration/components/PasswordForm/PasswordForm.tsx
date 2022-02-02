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
    name="password-form"
  >
    <StepSmallTitle>Criar senha</StepSmallTitle>

    <Styled.PasswordInput
      name="password"
      type="password"
      label="Cadastre uma senha"
      placeholder="Cadastre um senha"
      variant="outlined"
      inputProps={{ 'data-testid': 'password' }}
      FormHelperTextProps={{
        id: 'password-error',
      }}
    />

    <Styled.PasswordInput
      name="passwordConfirmation"
      type="password"
      label="Confirme sua senha"
      placeholder="Confirme sua senha"
      variant="outlined"
      inputProps={{ 'data-testid': 'passwordConfirmation' }}
      FormHelperTextProps={{
        id: 'passwordConfirmation-error',
      }}
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
