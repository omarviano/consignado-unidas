import styled from 'styled-components';
import ContainerStyles from '@mui/material/Container';
import { Button } from 'components/Buttons/Button';

interface MenuProps {
  menuOpen: boolean;
}

export const Container = styled.header`
  top: 0;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999;
  background-color: ${({ theme }) => theme.palette.secondary.main};
`;

export const Content = styled(ContainerStyles)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 54px;
`;

export const UserLogged = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: 400;
  font-size: 14px;
  width: max-content;

  svg {
    margin-left: 15px;
  }
`;

export const Menu = styled.div<MenuProps>`
  position: absolute;
  top: 54px;
  right: 20px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};

  a {
    display: block;
    font-size: 18px;
    line-height: 34px;
    text-align: center;
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.palette.grey[500]};
    padding: 21px 33px 16px;

    &:focus,
    &:hover {
      background: ${({ theme }) => theme.palette.primary.main};
      color: #fff;
      border-radius: 4px;
      font-weight: bold;
    }
  }
`;
