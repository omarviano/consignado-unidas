import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const SelectMostSuitableOption = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[500]};
  margin: 15px 0 12px;
`;
