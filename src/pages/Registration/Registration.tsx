import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExitToApp, ArrowBack, ArrowRightAlt } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Checkbox, Grid, InputLabel } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { Button } from 'components/Buttons/Button';

import * as Styled from './styles';

const NUMBER_OF_STEPS = 9;
const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClickPrev = (): void => {
    if (currentStep > 0) setCurrentStep(state => state - 1);
  };

  const handleClickNext = (): void => {
    if (currentStep + 1 < NUMBER_OF_STEPS) setCurrentStep(state => state + 1);
  };

  return (
    <>
      <Styled.Header>
        <Link to="/">
          Login
          <ExitToApp />
        </Link>
      </Styled.Header>

      <Formik
        initialValues={{}}
        onSubmit={values => console.log('values', values)}
      >
        <Styled.StepsContainer>
          <Styled.Step step={0} currentStep={currentStep}>
            <Styled.StepTitle>
              Para começar a simulação, precisamos que informe alguns dados ok?
              É bem rapidinho.
            </Styled.StepTitle>

            <Input
              name="cpf"
              type="text"
              label="Digite seu CPF"
              placeholder="Digite seu CPF"
              variant="outlined"
              mask="999.999.999-99"
            />

            <Styled.ContinueButton
              type="button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Continuar <ArrowRightAlt />
            </Styled.ContinueButton>
          </Styled.Step>

          <Styled.Step step={1} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.StepSmallTitle>
              Qual o seu nome completo?
            </Styled.StepSmallTitle>

            <Input
              name="name"
              type="text"
              label="Digite seu nome completo"
              placeholder="Digite seu nome completo"
              variant="outlined"
            />

            <Styled.ContinueButton
              type="button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Continuar <ArrowRightAlt />
            </Styled.ContinueButton>
          </Styled.Step>

          <Styled.Step step={2} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.StepSmallTitle>
              Qual a sua data de nascimento?
            </Styled.StepSmallTitle>

            <DatePicker
              name="dtNasc"
              value={new Date()}
              onChange={newValue => {
                console.log('newValue', newValue);
              }}
              label="Basic example"
            />

            <Styled.ContinueButton
              type="button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Continuar <ArrowRightAlt />
            </Styled.ContinueButton>
          </Styled.Step>

          <Styled.Step step={3} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.StepSmallTitle>
              Qual o seu melhor email?
            </Styled.StepSmallTitle>

            <Input
              name="email"
              type="text"
              label="Seu melhor email"
              placeholder="Seu melhor email"
              variant="outlined"
            />

            <Styled.ContinueButton
              type="button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Continuar <ArrowRightAlt />
            </Styled.ContinueButton>
          </Styled.Step>

          <Styled.Step step={4} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.StepSmallTitle>Qual o seu celular?</Styled.StepSmallTitle>

            <Input
              name="cellphone"
              type="text"
              label="Digite o número do seu telefone"
              placeholder="(XX)XXXXX-XXXX"
              variant="outlined"
              mask="(99)99999-9999"
            />

            <Styled.ContinueButton
              type="button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Continuar <ArrowRightAlt />
            </Styled.ContinueButton>
          </Styled.Step>

          <Styled.Step step={5} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.StepSmallTitle>
              Deseja fazer a simulação do seu empréstimo?
            </Styled.StepSmallTitle>

            <Input
              name="password"
              type="password"
              label="Cadastre uma senha"
              placeholder="Cadastre um senha"
              variant="outlined"
            />

            <Input
              name="passwordConfirmation"
              type="password"
              label="Confirme sua senha"
              placeholder="Confirme sua senha"
              variant="outlined"
            />

            <Styled.ContinueButton
              type="button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Continuar <ArrowRightAlt />
            </Styled.ContinueButton>
          </Styled.Step>

          <Styled.Step step={6} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.StepSmallTitle>
              Qual o seu vínculo trabalhista?
            </Styled.StepSmallTitle>

            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">
                Tipo de contrato
              </InputLabel>

              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Age"
                variant="outlined"
                displayEmpty
              >
                <MenuItem value="CLT">CLT</MenuItem>
                <MenuItem value="PJ">PJ</MenuItem>
                <MenuItem value="E">Estágio</MenuItem>
              </Select>
            </FormControl>

            <Styled.ContinueButton
              type="button"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Continuar <ArrowRightAlt />
            </Styled.ContinueButton>
          </Styled.Step>

          <Styled.Step step={7} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.BankDetailsConfirmationContainer>
              <Styled.Hello>Olá João da Silva Ribeiro!</Styled.Hello>
              <Styled.Email>joaodasilvaribeiro@gmail.com</Styled.Email>

              <Styled.BankDetailsConfirmationTitle>
                Você deseja informar os dados bancários para futuros
                empréstimos?
              </Styled.BankDetailsConfirmationTitle>
              <Styled.BankDetailsConfirmationText>
                Caso você não queira preeencher os dados, não se preocupe,
                poderá cadsatrar em um outro momento ok? Lembrando que para esta
                operação, só é possível utilizar conta corrente.
              </Styled.BankDetailsConfirmationText>

              <Styled.IAgreeTermsContainer>
                <Checkbox />

                <Styled.TermsText>
                  Estou de acordo com os{' '}
                  <Styled.TermsLink>termos e condições</Styled.TermsLink> da{' '}
                  <Styled.TermsLink>política de privacidade</Styled.TermsLink>.
                </Styled.TermsText>
              </Styled.IAgreeTermsContainer>

              <Styled.IAgreeTermsContainerButtons>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickNext}
                >
                  Sim
                </Button>
                <Button variant="outlined" color="primary">
                  Agora não
                </Button>
              </Styled.IAgreeTermsContainerButtons>
            </Styled.BankDetailsConfirmationContainer>
          </Styled.Step>

          <Styled.Step step={8} currentStep={currentStep}>
            <Styled.BackButton type="button" onClick={handleClickPrev}>
              <ArrowBack />
            </Styled.BackButton>

            <Styled.BankDataContainer>
              <Styled.Hello>Olá João da Silva Ribeiro!</Styled.Hello>
              <Styled.Email>joaodasilvaribeiro@gmail.com</Styled.Email>

              <Styled.BankDetailsConfirmationTitle>
                Você deseja informar os dados bancários para futuros
                empréstimos?
              </Styled.BankDetailsConfirmationTitle>
              <Styled.BankDetailsConfirmationText>
                Caso você não queira preeencher os dados, não se preocupe,
                poderá cadsatrar em um outro momento ok? Lembrando que para esta
                operação, <b>só é possível utilizar conta corrente</b>.
              </Styled.BankDetailsConfirmationText>

              <Styled.BankDataInputs>
                <Input
                  name="cc"
                  type="text"
                  label="Conta corrent"
                  placeholder="Conta corrent"
                  variant="outlined"
                />

                <Input
                  name="cc"
                  type="text"
                  label="Banco"
                  placeholder="Banco"
                  variant="outlined"
                />

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Input
                      name="agencia"
                      type="text"
                      label="Agência"
                      placeholder="N° da sua agência"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={7}>
                    <Input
                      name="numConta"
                      type="text"
                      label="N° da Conta Corrente"
                      placeholder="XXXXXX"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <Input
                      name="digito"
                      type="text"
                      label="Digito"
                      placeholder="Digito"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Styled.BankDataInputs>
            </Styled.BankDataContainer>

            <Styled.ContinueButton
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickNext}
            >
              Finalizar cadastro
            </Styled.ContinueButton>
          </Styled.Step>
        </Styled.StepsContainer>
      </Formik>
    </>
  );
};

export { Registration };
