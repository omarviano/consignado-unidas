import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBack, MailOutlined, Warning } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { AxiosError } from 'axios';

import useModal from 'hooks/useModal';
import { Document } from 'utils/document';

import { Layout } from 'components/Layout';
import { Button } from 'components/Buttons/Button';
import { ModalMessage } from 'components/ModalMessage';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';
import { Modal } from 'components/Modal';
import { CPFForm } from './components/CPFForm';
import { CNPJForm } from './components/CNPJForm';
import { CompleteNameForm } from './components/CompleteNameForm';
import { BirthDateForm } from './components/BirthDateForm';
import { EmailForm } from './components/EmailForm';
import { PhoneNumberForm } from './components/PhoneNumberForm';
import { PasswordForm } from './components/PasswordForm';
import { BankDataConfirmation } from './components/BankDataConfirmation';
import { BankDataForm } from './components/BankDataForm';

import { Register } from './models/register';
import { RegistrationServices } from './services/registration.services';

import * as Styled from './styles';

const NUMBER_OF_STEPS = 9;

const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(8);
  const [formsData, setFormsData] = useState<Register>();
  const [cpf, setCpf] = useState<string>();
  const [responseErros, setResponseErros] = useState<string>();
  const [registering, setRegistering] = useState(false);
  const { open: emailModalOpen, toggle: toggleEmailModal } = useModal();
  const { open: errorModalOpen, toggle: toggleErrorModal } = useModal();
  const { open: validationModalOpen, toggle: toggleValidationModal } =
    useModal();
  const [validationDataMessage, setvalidationDataMessage] = useState('');
  const history = useHistory();

  const registration = async (data: Register): Promise<void> => {
    try {
      setRegistering(true);

      await RegistrationServices.register({
        ...data,
        cpf: Document.removeMask(data.cpf),
        cnpj: Document.removeMask(data.cnpj),
        phoneNumber: Document.removeMask(data.phoneNumber),
        accountNumber: `${data.accountNumber}${data.digit}`,
      });

      toggleEmailModal();
    } catch (error) {
      const { response } = error as AxiosError;
      setResponseErros(response?.data?.message);
      toggleErrorModal();
    } finally {
      setRegistering(false);
    }
  };

  const handleClickPrev = (): void => {
    if (currentStep > 0) setCurrentStep(state => state - 1);
  };

  const onSubmit = (data): void => {
    setFormsData(state => ({ ...state, ...data }));
  };

  const onSubmitCPFForm = (data): void => {
    setCpf(data.cpf);
    onSubmit(data);
    setCurrentStep(1);
  };

  const onSubmitCNPJForm = (data): void => {
    onSubmit(data);
    setCurrentStep(2);
  };

  const onSubmitCompleteNameForm = (data): void => {
    onSubmit(data);
    setCurrentStep(3);
  };

  const onSubmitBirthDateForm = async ({
    birthDate,
  }: Register): Promise<void> => {
    try {
      await RegistrationServices.validateData({
        cpf: Document.removeMask(formsData?.cpf || ''),
        name: formsData?.name,
        birthDate,
      });

      onSubmit({ birthDate });
      setCurrentStep(4);
    } catch (error) {
      const { response } = error as AxiosError;

      setvalidationDataMessage(response?.data?.message);
      toggleValidationModal();
    }
  };

  const onSubmitEmailForm = (data): void => {
    onSubmit(data);
    setCurrentStep(5);
  };

  const onSubmitPhoneNumberForm = (data): void => {
    onSubmit(data);
    setCurrentStep(6);
  };

  const onSubmitPasswordForm = (data): void => {
    onSubmit(data);
    setCurrentStep(7);
  };

  const onClickNoButtonBankDataConfirmationForm = (): void => {
    if (!formsData) return;
    registration(formsData);
  };

  const onSubmitBankDataConfirmationForm = (): void => {
    if (!formsData) return;
    setCurrentStep(8);
  };

  const onSubmitBankDataForm = async (data): Promise<void> => {
    if (!formsData) return;
    registration({ ...formsData, ...data });
  };

  const onModalEmailClose = (): void => {
    history.push('/');
  };

  const handleClickButtonModalValidation = () => {
    setCurrentStep(0);
    toggleValidationModal();
  };

  const STEPS = {
    0: <CPFForm onSubmit={onSubmitCPFForm} />,
    1: <CNPJForm data={{ cpf }} onSubmit={onSubmitCNPJForm} />,
    2: <CompleteNameForm onSubmit={onSubmitCompleteNameForm} />,
    3: <BirthDateForm onSubmit={onSubmitBirthDateForm} />,
    4: <EmailForm onSubmit={onSubmitEmailForm} />,
    5: <PhoneNumberForm onSubmit={onSubmitPhoneNumberForm} />,
    6: <PasswordForm onSubmit={onSubmitPasswordForm} />,
    7: (
      <BankDataConfirmation
        submitting={registering}
        onSubmit={onSubmitBankDataConfirmationForm}
        onClickNoButton={onClickNoButtonBankDataConfirmationForm}
        username={formsData?.name}
        email={formsData?.email}
      />
    ),
    8: (
      <BankDataForm
        submitting={registering}
        onSubmit={onSubmitBankDataForm}
        username={formsData?.name}
        email={formsData?.email}
      />
    ),
  };

  return (
    <Layout>
      <Styled.StepIndicatorContainer>
        <Styled.BackButton type="button" onClick={handleClickPrev}>
          <ArrowBack />
        </Styled.BackButton>

        <Styled.StepTitle data-testid="step">
          Passo {currentStep + 1} de {NUMBER_OF_STEPS}
        </Styled.StepTitle>

        <Styled.StepIndicatorBox>
          {Array(NUMBER_OF_STEPS)
            .fill(null)
            .map((_, step) => (
              <Styled.StepIndicator active={step === currentStep} />
            ))}
        </Styled.StepIndicatorBox>
      </Styled.StepIndicatorContainer>

      <Styled.StepsContainer currentStep={currentStep}>
        {Array(NUMBER_OF_STEPS)
          .fill(null)
          .map((_, step) => (
            <Styled.Step step={step} currentStep={currentStep}>
              {step > 0 && (
                <Styled.BackButton type="button" onClick={handleClickPrev}>
                  <ArrowBack />
                </Styled.BackButton>
              )}

              {STEPS[currentStep]}
            </Styled.Step>
          ))}
      </Styled.StepsContainer>

      <ModalMessage
        open={emailModalOpen}
        onClose={onModalEmailClose}
        icon={
          <Badge badgeContent="!" color="secondary">
            <MailOutlined color="action" fontSize="large" />
          </Badge>
        }
        text={
          <span data-testid="success-modal-message">
            Olá <b>{formsData?.name}</b>! Favor acessar o seu e-mail e confirmar
            a conta.
          </span>
        }
        width="600px"
      />

      <Modal open={validationModalOpen}>
        <Styled.ModalContent>
          <Warning fontSize="large" color="warning" />

          <Styled.EmailModalText data-testid="validation-modal-message">
            {validationDataMessage}
          </Styled.EmailModalText>

          <Button
            type="button"
            color="primary"
            variant="contained"
            className="button-modal-validation"
            onClick={handleClickButtonModalValidation}
            data-testid="enter-data-again"
          >
            Informar dados novamente
          </Button>
        </Styled.ModalContent>
      </Modal>

      <ModalMessage
        open={errorModalOpen}
        onClose={toggleErrorModal}
        icon={<Warning color="error" />}
        text={<span data-testid="error-modal-message">{responseErros}</span>}
      />
    </Layout>
  );
};

export default withAITracking(reactPlugin, Registration, 'Registration');
