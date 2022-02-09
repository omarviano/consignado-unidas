import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Input } from 'components/Inputs/Input';

export const Text = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 16px;
  line-height: 26px;
  max-width: 304px;
  margin-top: -37px;

  @media (max-width: 768px) {
    margin-top: -10px;
  }
`;

export const CNPJContainer = styled.div`
  margin-top: 22px;

  > div:first-child {
    position: absolute;
    visibility: hidden;
    top: -9999px;
    left: 0;
  }

  @media (max-width: 768px) {
    margin-top: 59px;
  }
`;

export const CPFInput = styled(Input)``;

export const CNPJInput = styled(Input)`
  max-width: 450px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
