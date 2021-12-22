import styled, { css } from 'styled-components';

import FormControlStyles from '@mui/material/FormControl';
import TextFieldStyles from '@mui/material/TextField';

export interface LabelProps {
  isError: boolean | undefined;
}

export const Input = styled(TextFieldStyles)`
  .MuiOutlinedInput-root {
    border-radius: 8px;
    height: 38px;
  }

  .MuiInputBase-multiline {
    min-height: 38px;
    height: auto;
  }

  p {
    margin: 3px 0 0;
  }
`;

export const FormControl = styled(FormControlStyles)``;

export const Label = styled.label<LabelProps>`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.grey[100]};

  ${({ isError }) =>
    isError &&
    css`
      color: ${({ theme }) => theme.palette.error.main};
    `}
`;
