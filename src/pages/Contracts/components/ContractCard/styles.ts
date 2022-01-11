import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding: 16px;

  & + div {
    margin-top: 16px;
  }
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusLabel = styled.span``;

export const StatusValue = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    margin: 0 8px 0 4px;
    width: 12px;
    height: 12px;
  }
`;

export const ContractNumber = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin: 12px 0 0;
`;

export const ContractNumberValue = styled.b`
  color: ${({ theme }) => theme.palette.grey[400]};
  margin-left: 4px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 24px;
`;

export const DataContainer = styled.dl`
  flex: 1;
`;

export const DataLabel = styled.dt`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 14px;
  margin: 12px 0 4px;
`;

export const DataValue = styled.dd`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 16px;
`;

export const DetailsButton = styled.button`
  display: block;
  margin: 16px auto 0;
  background: none;
  border: 0;
  outline: none;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
  font-weight: 600;
  font-size: 14px;
`;
