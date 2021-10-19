import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { Formik } from 'components/Formik';
import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton/styles';

import { schema } from './schema';

import { BirthDateFormProps } from './props';

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Formik initialValues={{}} validationSchema={schema} onSubmit={onSubmit}>
      <StepSmallTitle>Qual a sua data de nascimento?</StepSmallTitle>

      <KeyboardDatePicker
        value={selectedDate}
        placeholder="10/10/2018"
        onChange={date => console.log(date)}
        format="dd/MM/yyyy"
        variant="dialog"
        name="birthDate"
        todayLabel="Hoje"
        cancelLabel="Cancelar"
        clearable={false}
        inputVariant="outlined"
      />

      <ContinueButton
        type="submit"
        size="small"
        variant="contained"
        color="primary"
      />
    </Formik>
  );
};

export { BirthDateForm };
