import styled from 'styled-components';
import { Card, IconButton } from '@material-ui/core';

export const Container = styled(Card)`
  position: absolute;
  width: 100%;
  max-width: 685px;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

export const CloseButton = styled(IconButton)`
  float: right;
  z-index: 1;
`;
