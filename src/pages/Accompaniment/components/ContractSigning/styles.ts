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

export const HelloUserName = styled(TypographyStyles)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[200]};
  line-height: 21px;
  font-size: 18px;
  letter-spacing: 0.2px;
  margin-bottom: 32px;
`;

export const TextInformative = styled(TypographyStyles)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.grey[200]};
  line-height: 20px;
  letter-spacing: 0.2px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.grey[200]};
  }
`;
