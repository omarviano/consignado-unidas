import styled, { css } from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Button } from 'components/Buttons/Button';
import { Slider as SliderStyles } from 'components/Slider';

interface TextTextValueSliderProps {
  disabled: boolean;
}

export const Container = styled.div`
  margin: 35px 16px 0 16px;
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

  @media (max-width: 768px) {
    margin-top: 8px;
    padding: 24px 14px 26px 14px;
    align-items: center;
    justify-content: center;
  }
`;

export const TextWhatValue = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-weight: 500;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 700;
  }
`;

export const TextInfomation = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 400;
    text-align: justify;
  }

  @media (max-width: 400px) {
    max-width: 264px;
  }
`;

export const Slider = styled(SliderStyles)`
  @media (max-width: 400px) {
    max-width: 260px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    height: 43px;
  }
`;
