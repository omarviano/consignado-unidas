import styled from 'styled-components';
import { Input } from 'components/Inputs/Input';
import { Button } from 'components/Buttons/Button';
import InputAdornmentStyles from '@mui/material/InputAdornment';
import IconButtonStyles from '@mui/material/IconButton';

export const InputEmail = styled(Input)`
  margin-bottom: 36px;
`;

export const InputPassword = styled(InputEmail)``;

export const ButtonEnter = styled(Button)``;

export const InputAdornment = styled(InputAdornmentStyles)``;

export const IconButton = styled(IconButtonStyles)`
  color: ${({ theme }) => theme.palette.grey[50]};
`;
