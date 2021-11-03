import styled from 'styled-components';

import ContainerStyles from '@mui/material/Container';
import DialogStyles from '@mui/material/Dialog';
import IconButtonProps from '@mui/material/IconButton';
import TypographyStyles from '@mui/material/Typography';
import DialogTitleStyles from '@mui/material/DialogTitle';

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
`;

export const MessaError = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 24px;
  font-weight: 400;
  margin-top: 49px;
`;
