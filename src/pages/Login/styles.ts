import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

import ImageBackground from 'assets/images/background.png';

export const Logo = styled.img`
  margin: 56px;

  @media (max-width: 768px) {
    margin-top: -77px;
    width: 160px;
    height: 45.87px;
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: url(${ImageBackground}) center no-repeat;
  background-size: cover;
`;

export const TextAccessAccount = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 36px;
`;

export const ContentTexts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 17px;
`;

export const LinkContainer = styled(TypographyStyles)`
  a {
    color: inherit;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }
`;
