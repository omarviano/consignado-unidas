import { Box } from '@material-ui/core';
import styled, { css } from 'styled-components';

interface StepProps {
  step: number;
  currentStep: number;
}

export const Header = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: 54px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  padding: 0 8%;
  z-index: 999;

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 16px;
    margin-left: auto;

    svg {
      margin-left: 24px;
    }
  }
`;

export const Container = styled.div`
  .modal-error {
    background: red;
  }
`;

export const StepsContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 54px;
  height: calc(100vh - 54px);
`;

export const Step = styled.div<StepProps>`
  position: absolute;
  padding: 64px 4% 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 100%;
  right: 0;
  left: 0;
  margin: auto;
  visibility: hidden;
  height: 0;
  overflow: hidden;

  ${({ currentStep, step }) =>
    step === currentStep &&
    css`
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 685px;
  background: #fff;
  padding: 64px 24px;
  text-align: center;
`;

export const EmailModalText = styled.p`
  margin-top: 32px;
  font-size: 18px;
  line-height: 34px;
`;
