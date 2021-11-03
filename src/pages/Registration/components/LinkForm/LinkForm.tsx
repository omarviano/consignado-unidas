import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

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
