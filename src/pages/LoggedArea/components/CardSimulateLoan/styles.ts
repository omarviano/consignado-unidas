import styled from 'styled-components';
import TypographyStyles from '@material-ui/core/Typography';
import { Button } from 'components/Buttons/Button';
import SliderStyles from '@material-ui/core/Slider';

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

export const TextValueSlider = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 30px;
  font-weight: 500;
  margin-top: 32px;
`;

export const Slider = styled(SliderStyles)`
  margin-top: 30px;
  color: ${({ theme }) => theme.palette.primary.main};

  .MuiSlider-thumb {
    height: 38px;
    width: 38px;
    background-color: ${({ theme }) => theme.palette.primary.contrastText};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const Icon = styled.img`
  margin-top: 8px;
`;

export const ButtonSimluteLoan = styled(Button)`
  margin-top: 32px;
  width: 219px;
  text-transform: none;
`;
