import styled from 'styled-components';
import { Input } from 'components/Inputs/Input';
import { Button } from 'components/Buttons/Button';
import InputAdornmentStyles from '@material-ui/core/InputAdornment';
import IconButtonStyles from '@material-ui/core/IconButton';

export const InputEmail = styled(Input)`
  margin-bottom: 36px;
`;

export const InputPassword = styled(InputEmail)``;

export const ButtonEnter = styled(Button)``;

export const InputAdornment = styled(InputAdornmentStyles)``;

export const IconButton = styled(IconButtonStyles)`
  color: ${({ theme }) => theme.palette.grey[50]};
`;
