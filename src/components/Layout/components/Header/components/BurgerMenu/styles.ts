import styled from 'styled-components';

interface ContainerProps {
  open: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  height: 25px;
  right: 20px;
  display: none;

  display: flex;
  position: static;
  justify-content: space-around;
  flex-flow: column nowrap;
  cursor: pointer;

  div {
    width: 22px;
    height: 4px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.primary.contrastText};
    transform-origin: 1px;
  }
`;
