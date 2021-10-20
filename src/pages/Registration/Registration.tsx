import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ExitToApp, ArrowBack, MailOutlined } from '@material-ui/icons';
import { Badge, Modal } from '@material-ui/core';

import useModal from 'hooks/modal';

import { CPFForm } from './components/CPFForm';
import { CompleteNameForm } from './components/CompleteNameForm';
import { BirthDateForm } from './components/BirthDateForm';
import { EmailForm } from './components/EmailForm';
import { PhoneNumberForm } from './components/PhoneNumberForm';
import { PasswordForm } from './components/PasswordForm';
import { BankDataConfirmation } from './components/BankDataConfirmation';
import { BankDataForm } from './components/BankDataForm';

import { Register } from './models/register';

import * as Styled from './styles';
import { RegistrationServices } from './services/registration.services';

const NUMBER_OF_STEPS = 8;

const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formsData, setFormsData] = useState<Register>();
  const { open: emailModalOpen, toggle: toggleEmailModal } = useModal();
  const history = useHistory();

  const handleClickPrev = (): void => {
    if (currentStep > 0) setCurrentStep(state => state - 1);
  };

  const nextStep = (): void => {
    if (currentStep + 1 < NUMBER_OF_STEPS) setCurrentStep(state => state + 1);
  };

  const onSubmit = (data): void => {
    setFormsData(state => ({ ...state, ...data }));

    nextStep();
  };

  const registration = async (data: Register): Promise<void> => {
    try {
      await RegistrationServices.register({
        ...data,
        cpf: data.cpf.replace(/\D/g, ''),
        phoneNumber: data.phoneNumber.replace(/\D/g, ''),
      });

      toggleEmailModal();
      history.push('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  const registerWhithoutBankData = (): void => {
    if (!formsData) return;
    registration(formsData);
  };

  const completeRegistration = async (data): Promise<void> => {
    if (!formsData) return;
    registration({ ...formsData, ...data });
  };

  return (
    <>
      <Styled.Header>
        <Link to="/">
          Login
          <ExitToApp />
        </Link>
      </Styled.Header>

      <Styled.StepsContainer>
        <Styled.Step step={0} currentStep={currentStep}>
          <CPFForm onSubmit={onSubmit} />
        </Styled.Step>

        <Styled.Step step={1} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <CompleteNameForm onSubmit={onSubmit} />
        </Styled.Step>

        <Styled.Step step={2} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <BirthDateForm onSubmit={onSubmit} />
        </Styled.Step>

        <Styled.Step step={3} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <EmailForm onSubmit={onSubmit} />
        </Styled.Step>

        <Styled.Step step={4} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <PhoneNumberForm onSubmit={onSubmit} />
        </Styled.Step>

        <Styled.Step step={5} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <PasswordForm onSubmit={onSubmit} />
        </Styled.Step>

        <Styled.Step step={6} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <BankDataConfirmation
            onSubmit={onSubmit}
            onClickNoButton={registerWhithoutBankData}
            username={formsData?.name}
            email={formsData?.email}
          />
        </Styled.Step>

        <Styled.Step step={7} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <BankDataForm
            onSubmit={completeRegistration}
            username={formsData?.name}
            email={formsData?.email}
          />
        </Styled.Step>
      </Styled.StepsContainer>

      <Modal open={emailModalOpen} onClose={toggleEmailModal}>
        <Styled.EmailModalContent>
          <Badge badgeContent="!" color="secondary">
            <MailOutlined color="action" fontSize="large" />
          </Badge>

          <Styled.EmailModalText>
            Olá <b>{formsData?.name}</b>? Favor acessar o seu e-mail e confirmar
            a conta.
          </Styled.EmailModalText>
        </Styled.EmailModalContent>
      </Modal>
    </>
  );
};

export { Registration };
