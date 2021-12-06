import styled from 'styled-components';
import { GridOverlay } from '@mui/x-data-grid';

export const NoData = styled(GridOverlay)`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.grey[200]};
  padding-top: 80px;
  height: 60px !important;
  position: relative !important;
`;
