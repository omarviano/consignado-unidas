import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 138px;
  padding: 48px;
  background: #f9f9f9;
  box-shadow: 0px 4px 20px rgba(46, 43, 80, 0.25);
  border-radius: 8px;
  z-index: 999;

  button {
    width: 203px;
    margin-left: 40px;
    text-transform: none;
  }
`;

export const Text = styled(TypographyStyles)`
  max-width: 1106px;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.palette.grey[400]};

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: underline;
    font-weight: bold;
  }
`;
