import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const SubTitle = styled(TypographyStyles)`
  color: #000000;
  margin-top: 24px;
  font-weight: 700;
`;

export const InformativeTexts = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 25.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 24px;
  text-align: justify;
`;

export const Strong = styled.strong`
  color: #000000;
`;
