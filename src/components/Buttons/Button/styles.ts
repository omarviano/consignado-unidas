import styled from 'styled-components';

import ButtonStyles from '@material-ui/core/Button';

export const Button = styled(ButtonStyles)`
  height: 50px;
  border-radius: 30px;

  &.MuiButton-outlined {
    border: 1px solid;
  }

  &.MuiButton-containedPrimary:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }

  &.MuiButton-outlinedPrimary:hover {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
