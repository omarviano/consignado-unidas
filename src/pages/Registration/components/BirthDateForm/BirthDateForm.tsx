import React from 'react';

import { Formik } from 'components/Formik';
import { DatePicker } from 'components/DatePicker';
import { TextField } from '@mui/material';
import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton';

import { schema } from './schema';

import { BirthDateFormProps } from './props';

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
    <StepSmallTitle>Qual a sua data de nascimento?</StepSmallTitle>

    <DatePicker
      value=""
      name="birthDate"
      maxDate={new Date(Date.now())}
      renderInput={params => <TextField {...params} />}
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
