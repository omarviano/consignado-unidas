import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Box } from '@mui/material';

export const Container = styled.div`
  max-width: 600px;
  padding: 215px 2% 32px;
  margin: auto;

  button {
    display: block;
    max-width: 279px;
    margin: 98px auto 0;
  }

  @media (max-width: 768px) {
    padding: 80px 2% 32px;

    button {
      margin: 48px auto 0;
    }
  }
`;

export const Title = styled(TypographyStyles)`
  margin: auto;
  font-size: 24px;
  line-height: 140%;
  color: ${({ theme }) => theme.palette.grey[400]};
  text-align: center;
`;

export const ModalContent = styled(Box)`
  width: 364px;
  background: #fff;
  padding: 64px 24px;
  text-align: center;

  button {
    max-width: 250px;
    font-size: 16px;
    text-transform: none;
  }

  @media (max-width: 768px) {
    width: 329px;
  }

  @media (max-width: 330px) {
    width: 200px;
    padding: 24px;
  }
`;

export const ModalTitle = styled(TypographyStyles)`
  margin: 16px 0 30px;
  font-size: 18px;
  line-height: 34px;
`;
