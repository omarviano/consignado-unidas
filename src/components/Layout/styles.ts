import styled from 'styled-components';
import ContainerStyles from '@mui/material/Container';

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const MainContent = styled(ContainerStyles)`
  max-width: 958px;
  overflow-y: hidden;
  overflow-x: hidden;
`;
