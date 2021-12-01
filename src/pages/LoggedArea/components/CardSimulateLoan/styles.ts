import styled, { css } from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Button } from 'components/Buttons/Button';

interface TextTextValueSliderProps {
  disabled: boolean;
}

export const Container = styled.div`
  margin-top: 35px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  height: 359px;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  padding: 40px 239px 30px 239px;
  border-radius: 4px;
  margin-bottom: 40px;
  width: 100%;
`;

export const TextWhatValue = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-weight: 500;
  font-size: 24px;
`;

export const TextInfomation = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-top: 10px;
`;

export const TextValueSlider = styled(
  TypographyStyles,
)<TextTextValueSliderProps>`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 30px;
  font-weight: 500;
  margin-top: 32px;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.palette.grey[50]};
    `}
`;

export const ButtonSimluteLoan = styled(Button)`
  margin-top: 32px;
  width: 219px;
  text-transform: none;
`;
