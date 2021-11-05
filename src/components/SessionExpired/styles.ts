import styled from 'styled-components';
import { Box } from '@mui/material';

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 685px;
  background: #fff;
  padding: 78px 24px;
  text-align: center;

  svg {
    width: 34px;
    height: 34px;
    color: ${({ theme }) => theme.palette.grey[200]};
  }

  button {
    max-width: 205px;
    font-size: 16px;
    text-transform: none;
  }
`;

export const ModalText = styled.p`
  font-size: 24px;
  margin: 16px auto 29px;
`;
