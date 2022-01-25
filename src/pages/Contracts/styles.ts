import styled, { css } from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Button } from 'components/Buttons/Button';

interface ButtonContainerProps {
  bottomOfPage: boolean;
}

interface ResponsiveContainerProps {
  noData: boolean;
}

export const Container = styled.div`
  position: relative;
  padding: 54px 8px 24px;

  @media (max-width: 720px) {
    padding: 16px 24px 100px;
  }
`;

export const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  max-width: 1286px;
  padding: 31px 56px;

  @media (max-width: 720px) {
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

  @media (max-width: 720px) {
    margin-bottom: 24px;
  }
`;

export const ButtonContainer = styled.div<ButtonContainerProps>`
  button {
    font-size: 16px;
    max-width: 250px;
    text-transform: none;

    @media (max-width: 720px) {
      display: block;
      width: 100%;
      max-width: 100%;
      font-weight: bold;
    }
  }

  @media (max-width: 720px) {
    position: ${({ bottomOfPage }) => (bottomOfPage ? 'absolute' : 'fixed')};
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 16px 53px;
    background: ${({ bottomOfPage }) => (bottomOfPage ? 'none' : '#fff')};
  }
`;

export const Breadcrumb = styled.div`
  display: flex;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-right: 32px;

  span {
    @media (max-width: 720px) {
      display: none;
    }
  }
`;

export const BreadcrumbRoot = styled.div`
  text-decoration-line: underline;
  margin-right: 8px;

  @media (max-width: 720px) {
    text-decoration: none;
    font-size: 21px;
  }
`;

export const BreadcrumbPage = styled.div`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.grey[100]};

  @media (max-width: 720px) {
    display: none;
  }
`;

export const TableButton = styled(Button)`
  height: 31px;
  width: 95px;
  text-transform: none;
  margin: auto;
`;

export const ResponsiveContainer = styled.div<ResponsiveContainerProps>`
  ${({ noData }) =>
    noData &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
      background: #fff;
      min-height: 70vh;
    `}

  .loading {
    display: block;
    margin: 80px auto;
  }
`;

export const NoData = styled(TypographyStyles)`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[200]};
  padding: 32px;
  text-align: center;
`;

export const StatusText = styled(TypographyStyles)`
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
`;
