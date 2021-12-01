import React from 'react';

import { Formik } from 'components/Formik';
import { DatePicker } from 'components/DatePicker';
import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton';

import * as Styled from './styles';
import { schema } from './schema';
import { BirthDateFormProps } from './props';

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
    <StepSmallTitle>Qual a sua data de nascimento?</StepSmallTitle>

    <Styled.InputContainer>
      <DatePicker value="" name="birthDate" disableFuture />
    </Styled.InputContainer>

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { BirthDateForm };
