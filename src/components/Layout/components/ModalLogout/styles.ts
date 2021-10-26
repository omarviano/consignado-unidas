import styled from 'styled-components';

import ContainerStyles from '@material-ui/core/Container';
import DialogStyles from '@material-ui/core/Dialog';
import IconButtonProps from '@material-ui/core/IconButton';
import TypographyStyles from '@material-ui/core/Typography';
import DialogTitleStyles from '@material-ui/core/DialogTitle';
import { Button } from 'components/Buttons/Button';

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
