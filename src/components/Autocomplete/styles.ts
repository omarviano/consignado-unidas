import styled, { css } from 'styled-components';

import MUTextField from '@mui/material/TextField';

export interface LabelProps {
  isError: boolean | undefined;
}

export const TextField = styled(MUTextField)`
  border-radius: 6px;

  .MuiInputBase-root {
    border-radius: 8px;
    height: 38px;

    input {
      padding: 0 !important;
    }
  }

  p {
    margin: 3px 0 0;
  }
`;

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
