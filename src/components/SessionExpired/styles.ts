import styled from 'styled-components';
import { Box } from '@mui/material';
import ButtonStyles from '@mui/material/Button';

export const ModalContent = styled(Box)`
  width: 685px;
  padding: 78px 24px;
  text-align: center;

  svg {
    width: 34px;
    height: 34px;
    color: #646464;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px;
  }
`;

export const Button = styled(ButtonStyles)`
  width: 100%;
  max-width: 205px;
  height: 50px;
  border-radius: 60px !important;
  text-transform: none !important;

  &.MuiButton-containedPrimary:hover {
    background-color: #003e6b;
  }
`;

export const ModalText = styled.p`
  font-size: 24px;
  margin: 16px auto 29px;
`;
