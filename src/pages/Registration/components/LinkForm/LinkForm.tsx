import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';

import { Formik } from 'components/Formik';
import { StepSmallTitle } from '../StepSmallTitle';
import { ContinueButton } from '../ContinueButton';

const LinkForm: React.FC = () => (
  <Formik initialValues={{}} onSubmit={values => console.log('values', values)}>
    <StepSmallTitle>Qual o seu vínculo trabalhista?</StepSmallTitle>

    <FormControl fullWidth>
      <InputLabel id="demo-multiple-name-label">Tipo de contrato</InputLabel>

      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Age"
        variant="outlined"
        displayEmpty
      >
        <MenuItem value="CLT">CLT</MenuItem>
        <MenuItem value="PJ">PJ</MenuItem>
        <MenuItem value="E">Estágio</MenuItem>
      </Select>
    </FormControl>

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { LinkForm };
