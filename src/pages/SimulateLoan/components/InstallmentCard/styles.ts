import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

interface DdProps {
  blackColor?: boolean;
}

export const Container = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);

  & + div {
    margin-top: 8px;
  }

  button {
    margin-top: 16px;
    height: 43px;
    text-transform: initial;
  }
`;

export const NumberInstallments = styled(TypographyStyles)`
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.grey[400]};
  margin-bottom: 12px;
`;

export const DataContainer = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 8px;
`;

export const Dt = styled.dt`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.grey[100]};
`;

export const Dd = styled.dd<DdProps>`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme, blackColor }) =>
    blackColor ? theme.palette.grey[400] : theme.palette.grey[100]};
  text-align: right;
`;
