import styled from 'styled-components';

import ContainerStyles from '@material-ui/core/Container';
import DialogStyles from '@material-ui/core/Dialog';
import IconButtonProps from '@material-ui/core/IconButton';
import TypographyStyles from '@material-ui/core/Typography';
import DialogTitleStyles from '@material-ui/core/DialogTitle';

export const DialogTitle = styled(DialogTitleStyles)``;

export const Container = styled(ContainerStyles)`
  margin-bottom: 20px;
  padding: 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    margin-top: 90px;
  }
`;

export const Dialog = styled(DialogStyles)`
  .MuiDialogTitle-root {
    padding: 0;
  }
  .MuiPaper-rounded {
    border-radius: 4px;
  }
`;

export const ContenDialogTitle = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const IconButton = styled(IconButtonProps)`
  :hover {
    background-color: transparent;
  }
`;

export const Icon = styled.img`
  cursor: pointer;
  width: 14px;
  height: 14px;
  margin: 10px 12px 0 0;
`;

export const MessaError = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 24px;
  font-weight: 400;
  margin-top: 49px;
`;
