import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const SubTitle = styled(TypographyStyles)`
  color: #000000;
  margin-top: 24px;
  font-weight: 700;

  @media (max-width: 920px) {
    margin: 64px 0 48px;
  }
`;

export const InformativeTexts = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 25.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 24px;
`;

export const Email = styled.a`
  color: #005b9e;
  text-decoration: underline;
`;

export const Link = styled.a`
  color: #005b9e;
  text-decoration: underline;
`;
