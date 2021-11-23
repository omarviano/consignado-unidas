import { Box } from '@mui/material';
import styled, { css } from 'styled-components';

interface StepProps {
  step: number;
  currentStep: number;
}

export const Container = styled.div``;

export const StepsContainer = styled.div`
  position: relative;
`;

export const Step = styled.div<StepProps>`
  padding: 96px 4% 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 100%;
  right: 0;
  left: 0;
  margin: auto;
  display: none;
  overflow: hidden;
  visibility: hidden;

  ${({ currentStep, step }) =>
    step === currentStep &&
    css`
      display: block;
      visibility: visible;
      height: auto;
    `}

  .MuiFormControl-root + .MuiFormControl-root {
    margin-top: 32px;
  }
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.palette.grey[100]};
  margin: 0 auto 36px 0;
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
