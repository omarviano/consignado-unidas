import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  width: 100%;
  max-width: 585px;

  svg {
    width: 48px;
    height: 48px;
  }
`;

export const Title = styled(TypographyStyles)`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 16px;
`;

export const Text = styled(TypographyStyles)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 16px;
`;
