import styled, { css } from 'styled-components';

export interface ContainerProps {
  disableBoxShadow?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;
  ${({ disableBoxShadow }) =>
    !disableBoxShadow &&
    css`
      box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
    `}
  margin-bottom: 24px;
`;
