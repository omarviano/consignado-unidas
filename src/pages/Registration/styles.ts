import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

interface StepsContainerProps {
  currentStep: number;
}

interface StepProps {
  step: number;
  currentStep: number;
}

export const StepsContainer = styled.div<StepsContainerProps>`
  height: ${({ currentStep }) =>
    currentStep < 6 ? 'calc(100vh - 320px)' : 'auto'};
  padding: 32px 0;

  @media (max-height: 450px) {
    height: auto;
  }
`;

export const Step = styled.div<StepProps>`
  display: none;
  padding: 0 16px 0;
  width: 100%;
  max-width: 720px;
  margin: auto;
  visibility: hidden;

  position: relative;
  top: 35%;
  transform: ${({ currentStep }) =>
    currentStep < 6 ? 'translateY(-20%)' : 'none'};
  height: ${({ currentStep }) => (currentStep < 6 ? '200px' : 'auto')};

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

  @media (max-height: 450px) {
    transform: none;
    height: auto;
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
