import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

interface ContainerUlProps {
  open: boolean;
}

interface ItensProps {
  active: boolean;
}

export const ContainerUl = styled.ul<ContainerUlProps>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  margin-top: 54px;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.25);
  flex-flow: column nowrap;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  position: fixed;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  top: 0;
  left: 0;
  height: 100vh;
  width: 226px;
  align-items: flex-start;
  z-index: 10000;
  transition: transform 0.25s ease-in-out;
`;

export const Items = styled(Link)<ItensProps>`
  display: flex;
  width: 100%;
  align-items: center;
  font-weight: 400;
  padding: 0 16px;
  font-size: 16px;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[500]};
  height: 50px;

  transition: ease-in-out 0.3s;

  & + a {
    margin-top: 30px;
  }

  :first-child {
    margin-top: 100px;
  }

  ${({ active }) =>
    active &&
    css`
        height: 50px;
        background-color: ${({ theme }) => theme.palette.primary.main};
        width: 100%;
        color: ${({ theme }) => theme.palette.primary.contrastText};
        font-weight: 500;
        font-size: 16px;
      }
    `}

  &:hover {
    height: 50px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    width: 100%;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-weight: 500;
    font-size: 16px;
  }
`;

export const ItemCustom = styled.a`
  display: flex;
  width: 100%;
  align-items: center;
  font-weight: 400;
  padding: 0 16px;
  font-size: 16px;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.grey[500]};
  height: 50px;

  transition: ease-in-out 0.3s;

  &:hover {
    height: 50px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    width: 100%;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-weight: 500;
    font-size: 16px;
  }
`;
