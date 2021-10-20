import React from 'react';

import { Formik } from 'components/Formik';
import { DatePicker } from 'components/DatePicker';
import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton';

import { schema } from './schema';

import { BirthDateFormProps } from './props';

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
    <StepSmallTitle>Qual a sua data de nascimento?</StepSmallTitle>

    <DatePicker
      name="birthDate"
      maxDate={new Date()}
      minDateMessage="Data de nascimento inválida"
      maxDateMessage="Data de nascimento inválida"
      invalidDateMessage="Data de nascimento inválida"
    />

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { BirthDateForm };
