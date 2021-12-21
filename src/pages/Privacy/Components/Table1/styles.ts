import styled from 'styled-components';

export const Table = styled.table`
  margin-top: 48px;
  width: 100%;
  border: 1px solid #4d8cbb;
  border-collapse: collapse;

  .border-none {
    border: 1px solid #4d8cbb;
    border-top: none;
    border-collapse: collapse;
  }
`;

export const Tr = styled.tr``;

export const Th1 = styled.th`
  border: 1px solid #4d8cbb;
  border-collapse: collapse;
  text-align: start;
  width: 250px !important;
  padding: 8px 0 8px 24px;
  background-color: #005b9e;
  color: #f9f9f9;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 635px) {
    width: auto !important;
    padding: 12px 8px;
    text-align: center;
  }
`;

export const Th2 = styled.th`
  text-align: start;
  padding: 8px 0 8px 56px;
  background-color: #ccdeec;
  color: #005b9e;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 635px) {
    padding: 12px 16px;
    text-align: left;
  }
`;

export const Td1 = styled.td`
  border: 1px solid #4d8cbb;
  border-collapse: collapse;
  padding: 44px 0 44px 44px;
  color: #005b9e;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 635px) {
    font-weight: bold;
    padding: 24px 16px;
    text-align: center;
  }
`;

export const Td2 = styled.td`
  border: 1px solid #4d8cbb;
  border-collapse: collapse;
  padding: 20px 8px 20px 57px;
  color: ${({ theme }) => theme.palette.grey[200]};
  font-size: 18px;
  font-weight: 400;
  line-height: 25.2px;
  line-break: anywhere;

  @media (max-width: 635px) {
    padding: 24px 16px;
  }
`;
