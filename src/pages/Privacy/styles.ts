import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  margin-top: 64px;
`;

export const TitlePage = styled(TypographyStyles)`
  color: #000000;
  text-align: center;
  font-weight: 700;
`;

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
`;

export const Strong = styled.strong`
  color: #000000;
`;

export const Email = styled.a`
  color: #005b9e;
  text-decoration: underline;
`;
