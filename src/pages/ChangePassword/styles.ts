import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import InputAdornmentStyles from '@mui/material/InputAdornment';
import IconButtonStyles from '@mui/material/IconButton';

export const Container = styled.div`
  margin: 128px 32px 24px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding: 64px 8px;

  @media (max-width: 650px) {
    margin: 8px 16px 40px;
    padding: 0;
    box-shadow: none;
    background: none;
  }
`;

export const Box = styled.div`
  max-width: 450px;
  margin: auto;

  form {
    .MuiFormControl-root + .MuiFormControl-root {
      margin-top: 32px;

      @media (max-width: 650px) {
        margin-top: 24px;
      }
    }

    > button {
      margin-top: 40px;
      max-width: 302px;

      @media (max-width: 650px) {
        max-width: 100%;
        margin-top: 36px;
      }
    }

    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
  }

  @media (max-width: 650px) {
    max-width: 100%;
  }
`;

export const InputAdornment = styled(InputAdornmentStyles)``;

export const IconButton = styled(IconButtonStyles)`
  color: ${({ theme }) => theme.palette.grey[50]};
`;

export const Title = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: #000000;
  margin-bottom: 26px;
`;

export const Text = styled(TypographyStyles)`
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.2px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.palette.grey[200]};

  @media (max-width: 650px) {
    margin-bottom: 32px;
  }
`;
