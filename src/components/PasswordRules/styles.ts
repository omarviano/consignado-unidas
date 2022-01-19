import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div``;

export const Label = styled(TypographyStyles)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-bottom: 16px;
`;

export const Rules = styled.ul`
  list-style: none;
`;

export const Rule = styled.li`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[200]};

  & + li {
    margin-top: 15px;
  }
`;
