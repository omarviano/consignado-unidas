import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExitToApp, ArrowBack } from '@material-ui/icons';

import { CPFForm } from './components/CPFForm';
import { CompleteNameForm } from './components/CompleteNameForm';
import { BirthDateForm } from './components/BirthDateForm';
import { EmailForm } from './components/EmailForm';
import { PhoneNumberForm } from './components/PhoneNumberForm';
import { PasswordForm } from './components/PasswordForm';
import { BankDataConfirmation } from './components/BankDataConfirmation';
import { BankDataForm } from './components/BankDataForm';

import * as Styled from './styles';

const NUMBER_OF_STEPS = 8;

const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formsData, setFormsData] = useState<object>();

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

  useEffect(() => {
    console.log('formsData', formsData);
  }, [formsData]);

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

          {/* <BirthDateForm onSubmit={onSubmit} /> */}
          <button type="button" onClick={nextStep}>
            next
          </button>
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

          <BankDataConfirmation onSubmit={onSubmit} />
        </Styled.Step>

        <Styled.Step step={7} currentStep={currentStep}>
          <Styled.BackButton type="button" onClick={handleClickPrev}>
            <ArrowBack />
          </Styled.BackButton>

          <BankDataForm onSubmit={onSubmit} />
        </Styled.Step>
      </Styled.StepsContainer>
    </>
  );
};

export { Registration };
