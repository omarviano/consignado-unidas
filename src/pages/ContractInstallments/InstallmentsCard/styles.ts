import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;

  & + div {
    margin-top: 24px;
  }
`;

export const DataContainer = styled.div`
  padding: 14px 16px;
`;

export const Status = styled(TypographyStyles)`
  font-size: 14px;
  color: #fff;
  padding: 8px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 0 0 4px 4px;
`;

export const Installment = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 18px;
`;

export const DataBox = styled.div`
  display: flex;
  gap: 22px;
`;

export const Data = styled.div`
  flex: 1;

  &:last-child {
    display: flex;
    flex-direction: column;
    min-width: 80px;
  }
`;

export const DataLabel = styled(TypographyStyles)`
  font-size: 10px;
  color: ${({ theme }) => theme.palette.grey[100]};
  margin-bottom: 8px;
`;

export const DataValue = styled(TypographyStyles)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[400]};
  margin-top: auto;
`;
