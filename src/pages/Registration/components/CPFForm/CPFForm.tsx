import React from 'react';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { ContinueButton } from '../ContinueButton';
import { StepTitle } from '../StepTile';

import { schema } from './schema';
import { CPFFormProps } from './props';

const CPFForm: React.FC<CPFFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} onSubmit={onSubmit} validationSchema={schema}>
    <StepTitle>
      Para começar a simulação, precisamos que informe alguns dados ok? É bem
      rapidinho.
    </StepTitle>

    <Input
      name="cpf"
      type="text"
      label="Digite seu CPF"
      placeholder="Digite seu CPF"
      variant="outlined"
      mask="999.999.999-99"
    />

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { CPFForm };
