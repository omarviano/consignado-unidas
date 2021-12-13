import styled from 'styled-components';
import { Card as MUICard } from '@mui/material';
import TypographyStyles from '@mui/material/Typography';

export const DataCard = styled(MUICard)`
  padding: 97px 150px;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  margin-bottom: 32px;

  > svg {
    width: 20px;
    margin-bottom: 16px;
  }
`;

export const HelloUsername = styled(TypographyStyles)`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-bottom: 64px;
`;

export const ReleasedCredit = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};

  & + p {
    margin-top: 32px;
  }

  .released {
    color: ${({ theme }) => theme.palette.success.main};
  }
`;

export const BankData = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 40px !important;
`;
