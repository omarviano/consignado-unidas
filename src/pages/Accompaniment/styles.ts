import styled, { css } from 'styled-components';
import { Card as MUICard, StepLabel as MUIStepLabel } from '@mui/material';

interface StepLabelContentProps {
  active: boolean;
}

export const Container = styled.div`
  margin-top: 100px;
  padding: 0 24px;
`;

export const StepperCard = styled(MUICard)`
  padding: 50px 0;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  margin-bottom: 13px;
`;

export const StepLabel = styled(MUIStepLabel)`
  .MuiStepLabel-label {
    margin-top: 0;
  }
`;

export const StepLabelContent = styled.span<StepLabelContentProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  line-height: 34px;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[50]};

  svg {
    margin: 4px 6px;
  }

  .tranparent-icon {
    color: transparent;
  }

  ${({ active }) =>
    active &&
    css`
      font-weight: bold;
      color: ${({ theme }) => theme.palette.grey[200]};
    `}
`;
