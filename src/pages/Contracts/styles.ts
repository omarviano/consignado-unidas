import { Button } from 'components/Buttons/Button';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 54px 2% 24px;

  @media (max-width: 920px) {
    padding: 16px 24px 40px;
  }
`;

export const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  max-width: 1286px;
  padding: 31px 56px;

  @media (max-width: 920px) {
    box-shadow: none;
    background: none;
    padding: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 140px;

  .button-container {
    margin-left: auto;
  }
`;

export const ButtonContainer = styled.div`
  button {
    font-size: 16px;
    max-width: 250px;
    text-transform: none;
  }
`;

export const Breadcrumb = styled.div`
  display: flex;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-right: 32px;

  span {
    @media (max-width: 920px) {
      display: none;
    }
  }
`;

export const BreadcrumbRoot = styled.div`
  text-decoration-line: underline;
  margin-right: 8px;

  @media (max-width: 920px) {
    text-decoration: none;
    font-size: 21px;
  }
`;

export const BreadcrumbPage = styled.div`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.grey[100]};

  @media (max-width: 920px) {
    display: none;
  }
`;

export const TableButton = styled(Button)`
  height: 31px;
  width: 95px;
  text-transform: none;
  margin: auto;
`;
