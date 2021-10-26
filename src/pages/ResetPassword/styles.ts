import styled from 'styled-components';
import TypographyStyles from '@material-ui/core/Typography';

import ImageBackground from 'assets/images/background.png';
import { Box } from '@material-ui/core';

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url(${ImageBackground}) center no-repeat;
  background-size: cover;

  .card {
    padding: 101px 119px;
    width: 685px;
  }

  .card form > button {
    margin-top: 38px;
  }

  .card form {
    .MuiFormControl-root + .MuiFormControl-root {
      margin-top: 24px;
    }
  }
`;

export const Title = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 36px;
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
  font-size: 40px;

  button {
    margin-top: 32px;
    max-width: 260px;
  }

  .success-icon {
    color: ${({ theme }) => theme.palette.success.main};
  }
`;

export const ModalTitle = styled(TypographyStyles)`
  margin-top: 32px;
  font-size: 24px;
  line-height: 34px;
  color: ${({ theme }) => theme.palette.grey[100]};
`;
