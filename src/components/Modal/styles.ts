import styled from 'styled-components';
import { Modal as MaterialModal, Box } from '@mui/material';

export const Modal = styled(MaterialModal)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;

  @media (max-height: 555px) {
    padding: 300px 0;
  }
`;

export const ModalContent = styled(Box)`
  position: relative;
  background: #fff;
  border-radius: 4px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 0;
  border: 0;
  background: none;
  outline: none;

  &:hover,
  &:focus {
    filter: brightness(0.65);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;
