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
  padding: 78px 24px;
  text-align: center;

  svg {
    width: 34px;
    height: 34px;
    color: ${({ theme }) => theme.palette.grey[200]};
  }

  button {
    max-width: 250px;
    font-size: 16px;
    text-transform: none;
  }

  .success-icon {
    color: ${({ theme }) => theme.palette.success.main};
  }
`;

export const ModalTitle = styled(TypographyStyles)`
  margin: 36px 0 30px;
  font-size: 18px;
  line-height: 34px;
`;
