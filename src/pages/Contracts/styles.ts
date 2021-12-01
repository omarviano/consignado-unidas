import { Button } from 'components/Buttons/Button';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 54px 2% 24px;
`;

export const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  max-width: 1286px;
  padding: 31px 56px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 140px;

  button {
    font-size: 16px;
    max-width: 250px;
    margin-left: auto;
    text-transform: none;
  }
`;

export const Breadcrumb = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-right: 32px;
`;

export const BreadcrumbRoot = styled.span`
  text-decoration-line: underline;
  margin-right: 8px;
`;

export const BreadcrumbPage = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.grey[100]};
`;

export const TableButton = styled(Button)`
  height: 31px;
  width: 95px;
  text-transform: none;
  margin: auto;
`;
