import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

import ImageBackground from 'assets/images/background.png';
import { Box } from '@mui/material';

export const Logo = styled.img`
  margin: 56px;

  @media (max-width: 768px) {
    margin-bottom: 80px;
    width: 100%;
    max-width: 200px;
  }
`;

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 48px;

  background: url(${ImageBackground}) center no-repeat;
  background-size: cover;

  .card {
    padding: 101px 119px;
    width: 685px;
    border-radius: 8px;

    @media (max-width: 768px) {
      width: 95%;
      max-width: 328px;
      padding: 16px;
    }
  }

  .card form > button {
    margin-top: 38px;

    @media (max-width: 768px) {
      margin-top: 24px;
    }
  }

  .card form {
    .MuiFormControl-root + .MuiFormControl-root {
      margin-top: 24px;
    }
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    background-position: right;
  }
`;

export const Title = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ModalContent = styled(Box)`
  width: 364px;
  padding: 64px 16px;
  text-align: center;
  font-size: 40px;

  button {
    margin-top: 32px;
    max-width: 260px;

    @media (max-width: 360px) {
      display: none;
    }
  }

  svg {
    color: ${({ theme }) => theme.palette.success.main};

    width: 40px;
  }

  @media (max-width: 768px) {
    padding: 64px 16px;
  }

  @media (max-width: 360px) {
    width: 255px;
  }
`;

export const ModalTitle = styled(TypographyStyles)`
  margin-top: 15px;
  font-size: 18px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.grey[100]};

  @media (max-width: 360px) {
    font-size: 16px;
  }
`;
