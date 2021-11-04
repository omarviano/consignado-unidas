import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import InputAdornmentStyles from '@mui/material/InputAdornment';
import IconButtonStyles from '@mui/material/IconButton';

export const Container = styled.div`
  margin: 154px 80px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding: 64px 8px;
`;

export const Box = styled.div`
  max-width: 450px;
  margin: auto;

  form {
    .MuiFormControl-root + .MuiFormControl-root {
      margin-top: 32px;
    }

    > button {
      margin-top: 40px;
      max-width: 302px;
    }

    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
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
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 8px;
  top: -24px;
  padding: 0;
  border: 0;
  background: none;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 364px;
  background: #fff;
  padding: 96px 58px;
  text-align: center;
  font-size: 48px;

  button {
    margin-top: 32px;
    max-width: 260px;
  }

  .success-icon {
    color: ${({ theme }) => theme.palette.success.main};
  }

  .warning-icon {
    color: ${({ theme }) => theme.palette.warning.main};
  }
`;

export const ModalTitle = styled(TypographyStyles)`
  margin-top: 15px;
  font-size: 18px;
  line-height: 34px;
  color: ${({ theme }) => theme.palette.grey[200]};
`;
