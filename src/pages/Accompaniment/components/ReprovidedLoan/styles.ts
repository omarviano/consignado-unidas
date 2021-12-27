import styled from 'styled-components';
import { Card as MUICard } from '@mui/material';
import TypographyStyles from '@mui/material/Typography';
import { Button } from 'components/Buttons/Button';

export const Container = styled(MUICard)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  margin-bottom: 32px;
  padding: 100px 0 100px 0;

  @media (max-width: 920px) {
    padding: 24px 16px;
  }
`;

export const ReprovidedLoan = styled(TypographyStyles)`
  line-height: 34px;

  font-weight: 400;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
`;

export const Simulate = styled(TypographyStyles)`
  line-height: 34px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 36px;
`;

export const Reprovided = styled.strong`
  text-transform: uppercase;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.error.main}; ;
`;

export const ButtonNewSimulateLoan = styled(Button)`
  text-transform: none;
  margin-top: 65px;
  width: 254px;
`;
