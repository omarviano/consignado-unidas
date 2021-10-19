import styled from 'styled-components';

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

export const StepsContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 54px;
  height: calc(100vh - 54px);
`;

export const Step = styled.div<StepProps>`
  position: absolute;
  padding: 100px 4% 64px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 100%;
  right: 0;
  left: 0;
  margin: auto;
  visibility: ${({ currentStep, step }) =>
    step === currentStep ? 'visible' : 'hidden'};

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
