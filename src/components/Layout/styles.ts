import styled, { css } from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

import { Button } from 'components/Buttons/Button';

interface OptionsProps {
  menuOpen: boolean;
}

interface DivOpacityProps {
  open: boolean;
}

export const DivOpacity = styled.div<DivOpacityProps>`
  ${({ open }) =>
    open &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      width: 100%;
      height: 100vh;
      z-index: 999;
      }
    `}
`;

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

  .sign-in {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    width: 108px;
    height: 35px;
    margin-left: auto;
    border: 1px solid #ffffff;
    border-radius: 60px;
    font-size: 16px;

    &:hover,
    &:focus {
      filter: brightness(0.9);
    }
  }

  @media (max-width: 920px) {
    height: 56px;
    padding: 0 16px;
  }
`;

export const Logo = styled.img`
  height: 40px;

  @media (max-width: 920px) {
    height: 30px;
  }
`;

export const Nav = styled.nav`
  margin: 0 72px 0 100px;
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

export const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: auto;
  background: none;
  outline: none;
  border: none;
  border-radius: 50%;

  svg {
    fill: #fff;
  }

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 920px) {
    display: flex;
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
  top: 32px;
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

  @media (max-width: 920px) {
    padding-top: 64px;
  }
`;

export const FooterContainer = styled.div`
  background: ${({ theme }) => theme.palette.primary.dark};
  padding: 28px 8% 18px;

  @media (max-width: 720px) {
    padding: 28px 4% 18px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: auto;
  color: #fff;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const FooterContent = styled.div`
  padding-bottom: 24px;
  flex: 1;

  &:first-child {
    max-width: 300px;
  }

  a {
    display: block;
    margin-bottom: 16px;
    color: inherit;
    text-decoration: none;
    font-weight: 400;
    font-size: 16px;

    @media (max-width: 720px) {
      font-weight: 700;
      font-size: 16px;
    }
  }

  @media (max-width: 720px) {
    text-align: center;

    &:first-child {
      max-width: 100%;
    }
  }
`;

export const About = styled.div``;

export const AboutText = styled.p`
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  & + p {
    margin-top: 12px;
  }
`;

export const Version = styled.div`
  font-size: 12px;
`;

export const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #8d8d8d;
  padding: 16px 0 0;
  text-align: center;
  font-size: 10px;
`;

export const CopyrightText = styled.span``;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 48px 36px;
  }
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

  @media (max-width: 768px) {
    width: 108px;
    height: 35px;
    margin-left: 0;
  }
`;

export const ButtonNo = styled(Button)`
  width: 188px;
  margin: 0 40px;

  @media (max-width: 768px) {
    width: 108px;
    height: 35px;
    margin-right: 0;
  }
`;
