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

  @media (max-width: 920px) {
    padding: 24px 16px;
  }
`;

export const HelloUsername = styled(TypographyStyles)`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-bottom: 16px;
`;

export const RequestUnderAnalysis = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 40px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
`;
