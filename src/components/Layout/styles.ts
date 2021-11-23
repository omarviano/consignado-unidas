import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { IconButton } from '@mui/material';

import { Button } from 'components/Buttons/Button';

interface OptionsProps {
  menuOpen: boolean;
}

export const Page = styled.div`
  max-width: 2000px;
  margin: auto;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  margin: auto;
  left: 0;
  width: 100%;
  max-width: 2000px;
  height: 80px;
  padding: 0 85px;
  background: ${({ theme }) => theme.palette.primary.main};
  filter: drop-shadow(0px 2px 6px rgba(46, 43, 80, 0.25));
  z-index: 999;

  > a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 16px;
    margin-left: auto;

    svg {
      margin-left: 24px;
    }
  }

  @media (max-width: 920px) {
    height: 56px;
    padding: 0 40px;
  }
`;

export const Logo = styled.img`
  height: 40px;

  @media (max-width: 920px) {
    height: 30px;
  }
`;

export const Nav = styled.nav`
  margin: 0 24px 0 100px;
  max-width: 708px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;

  a {
    font-size: 18px;
    color: #cedce1;
    outline: none;
    line-height: 1;

    & + a {
      margin-left: 16px;
    }

    &:hover,
    &:focus {
      color: #fff;
    }

    &.active {
      font-weight: bold;
      font-size: 20px;
      color: #fff;
    }
  }

  @media (max-width: 920px) {
    display: none;
  }
`;

export const MenuButton = styled(IconButton)`
  display: none;
  margin-left: auto;

  svg {
    fill: #fff;
  }

  @media (max-width: 920px) {
    display: block;
  }
`;

export const UserOptionsContainer = styled.div`
  position: relative;
  margin-left: auto;

  @media (max-width: 920px) {
    display: none;
  }
`;

export const UserLogged = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: 400;
  font-size: 14px;
  border: 0;
  background: none;
  padding: 0 8px;
  border-radius: 4px;
  margin-top: 4px;

  svg {
    margin-left: 15px;
  }
  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const Username = styled.span`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Options = styled.div<OptionsProps>`
  position: absolute;
  width: 188px;
  top: 54px;
  right: -8px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  display: ${({ menuOpen }) => (menuOpen ? 'block' : 'none')};

  a {
    display: block;
    font-size: 18px;
    text-align: center;
    letter-spacing: 0.2px;
    line-height: 0.95;
    color: ${({ theme }) => theme.palette.grey[500]};
    padding: 16px 12px;
    border-radius: 4px;

    &:focus,
    &:hover {
      background: ${({ theme }) => theme.palette.primary.light};
      color: #fff;
      outline: none;
    }
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: block;
  font-size: 18px;
  font-weight: 300;
  font-family: Roboto, sans-serif;
  text-align: center;
  letter-spacing: 0.2px;
  line-height: 0.95;
  color: ${({ theme }) => theme.palette.grey[500]};
  padding: 16px 12px;
  border-radius: 4px;
  border: 0;
  background: none;
  outline: none;

  &:focus,
  &:hover {
    background: ${({ theme }) => theme.palette.primary.light};
    color: #fff;
    outline: none;
  }
`;

export const Container = styled.div`
  position: relative;
  padding: 80px 0;
  min-height: calc(100vh - 83px);
  margin: auto;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  min-height: 83px;
  background: ${({ theme }) => theme.palette.primary.dark};
  color: #fff;
  padding: 8px 54px;

  a {
    color: inherit;
    text-decoration: underline;
    font-weight: 300;
    font-size: 16px;
  }
`;

export const FooterBox = styled.div`
  margin-left: auto;
`;

export const FooterText = styled(TypographyStyles)`
  text-align: right;
  font-weight: 300;
  font-size: 16px;

  & + p {
    margin-top: 5px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  padding: 40px 0;
`;

export const Title = styled(TypographyStyles)`
  font-weight: 400px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 17px;
`;

export const DivButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

export const ButtonYes = styled(Button)`
  width: 188px;
  margin-left: 40px;
`;

export const ButtonNo = styled(Button)`
  width: 188px;
  margin-right: 40px;
`;
