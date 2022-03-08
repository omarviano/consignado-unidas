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
  const [currentStep, setCurrentStep] = useState(0);
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
        <Styled.Step step={0} currentStep={currentStep}>
          <CPFForm onSubmit={onSubmitCPFForm} />
        </Styled.Step>

        <Styled.Step step={1} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <CNPJForm data={{ cpf }} onSubmit={onSubmitCNPJForm} />
        </Styled.Step>

        <Styled.Step step={2} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <CompleteNameForm onSubmit={onSubmitCompleteNameForm} />
        </Styled.Step>

        <Styled.Step step={3} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <BirthDateForm onSubmit={onSubmitBirthDateForm} />
        </Styled.Step>

        <Styled.Step step={4} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <EmailForm onSubmit={onSubmitEmailForm} />
        </Styled.Step>

        <Styled.Step step={5} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <PhoneNumberForm onSubmit={onSubmitPhoneNumberForm} />
        </Styled.Step>

        <Styled.Step step={6} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <PasswordForm onSubmit={onSubmitPasswordForm} />
        </Styled.Step>

        <Styled.Step step={7} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <BankDataConfirmation
            submitting={registering}
            onSubmit={onSubmitBankDataConfirmationForm}
            onClickNoButton={onClickNoButtonBankDataConfirmationForm}
            username={formsData?.name}
            email={formsData?.email}
          />
        </Styled.Step>

        <Styled.Step step={8} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <BankDataForm
            submitting={registering}
            onSubmit={onSubmitBankDataForm}
            username={formsData?.name}
            email={formsData?.email}
          />
        </Styled.Step>
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
