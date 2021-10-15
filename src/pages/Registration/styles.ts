import styled from 'styled-components';
import { Button } from 'components/Buttons/Button';

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
`;

export const StepTitle = styled.p`
  max-width: 700px;
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #646464;
  margin-bottom: 24px;
`;

export const ContinueButton = styled(Button)`
  margin-top: 64px;

  svg {
    margin-left: 16px;
  }
`;

export const BackButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.palette.grey[100]};
  margin: 0 auto 36px 0;
`;

export const StepSmallTitle = styled.p`
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #646464;
  margin-bottom: 50px;
`;

export const BankDetailsConfirmationContainer = styled.div``;

export const Hello = styled.div`
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #646464;
`;

export const Email = styled.div`
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #848484;
`;

export const BankDetailsConfirmationTitle = styled.div`
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #646464;
  margin: 32px 0;
  max-width: 450px;
`;

export const BankDetailsConfirmationText = styled.div`
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #848484;
  max-width: 450px;
`;

export const IAgreeTermsContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 350px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.2px;
  color: #848484;
  margin-top: 32px;
`;

export const TermsText = styled.div``;

export const TermsLink = styled.button`
  border: 0;
  background: none;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
`;

export const IAgreeTermsContainerButtons = styled.div`
  display: flex;
  margin-top: 32px;

  button + button {
    margin-left: 40px;
  }
`;

export const BankDataContainer = styled.div``;

export const BankDataInputs = styled.div`
  margin-top: 32px;
`;
