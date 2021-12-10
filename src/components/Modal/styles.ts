import styled from 'styled-components';
import { Modal as MaterialModal, Box } from '@mui/material';

export const Modal = styled(MaterialModal)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;

  @media (max-height: 500px) {
    align-items: flex-start;
    padding: 8% 0;
  }
`;

export const ModalContent = styled(Box)`
  position: relative;
  max-width: 90%;
  background: #fff;
  border-radius: 4px;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
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
