import styled, { css } from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Box } from '@mui/material';

interface StepsContainerProps {
  currentStep: number;
}

interface StepProps {
  step: number;
  currentStep: number;
}

interface StepIndicatorProps {
  active: boolean;
}

export const StepIndicatorContainer = styled.div`
  position: relative;
  max-width: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  margin: 4% auto 56px;

  > button {
    display: none;
    position: absolute;
    margin: auto;
    left: 16px;
  }

  @media (max-width: 768px) {
    margin: 12px auto 34px;

    > button {
      display: block;
      color: #cedce1;
    }
  }
`;

export const StepTitle = styled(TypographyStyles)`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-bottom: 9px;
`;

export const StepIndicatorBox = styled.div`
  display: flex;
  gap: 17px;
  justify-content: center;
`;

export const StepIndicator = styled.span<StepIndicatorProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active, theme }) =>
    active ? theme.palette.primary.main : '#cedce1'};
`;

export const StepsContainer = styled.div<StepsContainerProps>``;

export const Step = styled.div<StepProps>`
  display: none;
  padding: 0 16px 0;
  width: 100%;
  max-width: ${({ currentStep }) => (currentStep > 0 ? '450px' : '720px')};
  margin: auto;
  visibility: hidden;

  ${({ currentStep, step }) =>
    step === currentStep &&
    css`
      display: block;
      visibility: visible;
    `}

  .MuiFormControl-root + .MuiFormControl-root {
    margin-top: 32px;

    @media (max-width: 768px) {
      margin-top: 16px;
    }
  }

  @media (max-width: 768px) {
    > button {
      display: none;
    }
  }
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.palette.grey[100]};
  margin-bottom: 36px;
`;

export const ModalContent = styled(Box)`
  width: 685px;
  padding: 64px 24px;
  text-align: center;

  .button-modal-validation {
    max-width: 300px;
    margin: 24px auto 0;
  }
`;

export const EmailModalText = styled.p`
  margin-top: 32px;
  font-size: 18px;
  line-height: 34px;
`;
