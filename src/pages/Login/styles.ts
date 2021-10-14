import styled from 'styled-components';
import TypographyStyles from '@material-ui/core/Typography';
import { InputOutlined } from 'components/Inputs/Input';
import { Button } from 'components/Buttons/Button';

import ImageBackground from 'assets/images/background.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url(${ImageBackground}) center no-repeat;
  background-size: cover;
`;

export const Card = styled.div`
  max-width: 589px;
  max-height: 500px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  padding: 120px 120px 70px;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  border-radius: 8px;
`;

export const TextAccessAccount = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 36px;
`;

export const InputEmail = styled(InputOutlined)`
  margin-bottom: 36px;
`;

export const InputPassword = styled(InputEmail)``;

export const ButtonEnter = styled(Button)``;

export const ContentTexts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 17px;
`;

export const TextSignUp = styled(TypographyStyles)``;

export const TextForgotPassword = styled(TypographyStyles)``;
