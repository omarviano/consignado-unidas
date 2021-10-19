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
  padding: 0 30px;

  margin-top: 55px;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.25);
  flex-flow: column nowrap;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  position: fixed;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  top: 0;
  left: 0;
  height: 100vh;
  width: 225px;
  align-items: flex-start;
  z-index: 10000;
  transition: transform 0.25s ease-in-out;
`;

export const Items = styled(Link)<ItensProps>`
  display: inline-block;
  position: relative;
  padding: 0 20px;
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary.light};

  ${({ active }) =>
    active &&
    css`
      ::after {
        content: '';
        position: absolute;
        height: 3px;
        background-color: ${({ theme }) => theme.palette.primary.dark};
        width: 100%;
        left: 0;
        top: 28px;
      }
    `}

  width: 100%;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[400]};
  padding: 8px 0;

  ${({ active }) =>
    active &&
    css`
      ::after {
        content: '';
        position: absolute;
        height: 3px;
        background-color: transparent;
        width: 100%;
        left: 0;
        top: 28px;
      }
    `}

  & + a {
    border-top: 1.5px solid ${({ theme }) => theme.palette.grey[200]};
  }

  :first-child {
    padding-top: 20px;
  }
`;
