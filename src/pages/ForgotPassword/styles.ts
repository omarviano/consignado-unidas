import styled from 'styled-components';
import TypographyStyles from '@material-ui/core/Typography';

import ImageBackground from 'assets/images/background.png';
import { Box, IconButton } from '@material-ui/core';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url(${ImageBackground}) center no-repeat;
  background-size: cover;

  .card {
    padding: 6%;
  }

  .card form > button {
    margin-top: 38px;
  }
`;

export const Title = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 36px;
`;

export const SubTitle = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 35px;
`;

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 685px;
  background: #fff;
  padding: 64px 96px;
  text-align: center;

  .resend {
    margin-top: 32px;
  }

  .badge {
    font-size: 60px;

    span {
      height: 36px;
      border-radius: 50%;
    }
  }
`;

export const EmailModalTitle = styled(TypographyStyles)`
  margin-top: 32px;
  font-size: 24px;
  line-height: 34px;
  color: ${({ theme }) => theme.palette.grey[100]};
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
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
  margin: 0;
`;
