import styled from 'styled-components';
import ContainerStyles from '@material-ui/core/Container';
import TypographyStyles from '@material-ui/core/Typography';

export const Container = styled.header`
  top: 0;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
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

export const TextUserLogged = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-weight: 400;
`;
