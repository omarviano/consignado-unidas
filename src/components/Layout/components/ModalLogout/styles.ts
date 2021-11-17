import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Button } from 'components/Buttons/Button';

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
