import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 32px;

  svg {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    min-height: auto !important;
    padding: 40px 32px;
  }
`;

export const Title = styled(TypographyStyles)`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 32px;
  line-height: 1.5;
`;

export const Text = styled(TypographyStyles)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-top: 24px;
  line-height: 1.5;
`;
