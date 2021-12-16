import styled from 'styled-components';
import { Card as MUICard } from '@mui/material';
import TypographyStyles from '@mui/material/Typography';

export const Card = styled(MUICard)`
  padding: 36px 25px 0 33px;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  margin-bottom: 32px;
`;

export const LoanInformation = styled(TypographyStyles)`
  line-height: 34px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
`;

export const TotalAmountOfLoanRequested = styled(TypographyStyles)`
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const Approved = styled.strong`
  text-transform: uppercase;
  font-size: 18px;
  color: #27ae60;
`;

export const InstallmentDueDate = styled(TypographyStyles)`
  line-height: 34px;
  letter-spacing: 0.2px;
  margin-top: 78px;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const ProposalInformation = styled(TypographyStyles)`
  line-height: 11px;
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-bottom: 44px;
`;

export const TextBlack = styled.span`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-weight: 500;
`;
