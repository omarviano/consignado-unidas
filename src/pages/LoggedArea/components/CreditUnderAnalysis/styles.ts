import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  max-width: 329px;
  margin: 107px 16px 0 31px;
  padding: 24px 30px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;

  &:hover,
  &:focus {
    filter: brightness(0.985);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 8px 16px 0 16px;
    padding: 16px 0 16px 16px;
  }
`;

export const PreTitle = styled(TypographyStyles)`
  font-size: 14px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[500]};

  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 400;
  }
`;

export const Title = styled(TypographyStyles)`
  font-weight: bold;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[400]};
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 0;
    color: ${({ theme }) => theme.palette.grey[200]};
  }
`;

export const Text = styled(TypographyStyles)`
  font-size: 14px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[500]};

  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 400;
  }
`;
