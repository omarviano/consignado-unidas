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

  background: url(${ImageBackground}) center no-repeat;
  background-size: cover;

  padding-bottom: 40px;

  .card {
    padding: 6%;
    border-radius: 8px;

    @media (max-width: 768px) {
      padding: 16px;
      max-width: 328px;
      margin: 0 16px;
    }
  }

  .card form > button {
    margin-top: 38px;

    @media (max-width: 768px) {
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
  line-height: 1.5;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SubTitle = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 35px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 14px;
  }
`;

export const ModalContent = styled(Box)`
  width: 685px;
  background: #fff;
  padding: 64px 96px;
  text-align: center;
  border-radius: 8px;

  .resend {
    margin-top: 32px;
  }

  .badge {
    font-size: 60px;

    @media (max-width: 768px) {
      font-size: 40px;
    }

    span {
      height: 36px;
      border-radius: 50%;

      @media (max-width: 768px) {
        height: 24px;
        width: 24px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 41px 24px 28px;
    width: 328px;
  }

  @media (max-width: 350px) {
    width: 250px;
  }
`;

export const EmailModalTitle = styled(TypographyStyles)`
  margin-top: 32px;
  font-size: 24px;
  line-height: 34px;
  color: ${({ theme }) => theme.palette.grey[100]};

  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 18px;
  }
`;

export const ModalText = styled(TypographyStyles)`
  margin-top: 16px;
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[100]};

  b {
    display: block;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const ButtonGoBack = styled.button`
  color: ${({ theme }) => theme.palette.grey[100]};
  background: none;
  border: none;
  margin-bottom: 16px;
`;
