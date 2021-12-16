import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { Step, StepIconProps, Stepper, Box, Skeleton } from '@mui/material';
import {
  CheckCircle,
  CropSquare,
  WatchLater,
  Cancel,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import { RoutingPath } from 'utils/routing';
import { QuotationStatus } from 'enums/quote';
import { RequestUnderAnalysis } from './components/RequestUnderAnalysis';
import { AwaitingSubmissionOfDocumentation } from './components/AwaitingSubmissionOfDocumentation';
import { DocumentationSent } from './components/DocumentationSent';
import { ReleasedCredit } from './components/ReleasedCredit';
import { AccompanimentServices } from './services/accompaniment.services';
import { ApprovedLoan } from './components/ApprovedLoan';
import { ReprovidedLoan } from './components/ReprovidedLoan';
import { ContractSigning } from './components/ContractSigning';

import { Quote } from './models/quote';

import * as Styled from './styles';
import * as MUIStyled from './muiStyles';

const steps = [
  'Simulação',
  'Análise de Crédito',
  'Documentação',
  'Empréstimo',
  'Assinatura de Contrato',
  'Crédito Liberado',
];

enum StepsEnum {
  'Simulacao' = 0,
  'AnaliseCredito' = 1,
  'Documentacao' = 2,
  'Emprestimo' = 3,
  'AssinaturaContrato' = 4,
  'CerditoLiberado' = 5,
}

const qontoStepIcon = (props: StepIconProps) => {
  const { active, className, completed } = props;

  return (
    <MUIStyled.QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed || active ? (
        <div className="QontoStepIcon-circle-colored" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </MUIStyled.QontoStepIconRoot>
  );
};

const Accompaniment: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useState(0);
  const [checking, setChecking] = useState(true);
  const history = useHistory();
  const [quote, setQuote] = useState<Quote>();

  const STEP_NUMBER = useMemo(
    () => ({
      [QuotationStatus.Analise]: StepsEnum.AnaliseCredito,
      [QuotationStatus.Documentacao]: StepsEnum.Documentacao,
      [QuotationStatus.DocumentacaoPendente]: StepsEnum.Documentacao,
      [QuotationStatus.Aprovado]: StepsEnum.Emprestimo,
      [QuotationStatus.RecusadoPeloUsuario]: StepsEnum.Emprestimo,
      [QuotationStatus.AssinaturaContrato]: StepsEnum.AssinaturaContrato,
      [QuotationStatus.AssinaturaContratoPendente]:
        StepsEnum.AssinaturaContrato,
      [QuotationStatus.CreditoLiberado]: StepsEnum.CerditoLiberado,
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: StepsEnum.Emprestimo,
    }),
    [],
  );

  const STEPS_COMPONENTS = useMemo(
    () => ({
      [QuotationStatus.Analise]: <RequestUnderAnalysis />,
      [QuotationStatus.Aprovado]: <ApprovedLoan />,
      [QuotationStatus.RecusadoPeloUsuario]: <ReprovidedLoan />,
      [QuotationStatus.DocumentacaoPendente]: (
        <AwaitingSubmissionOfDocumentation />
      ),
      [QuotationStatus.Documentacao]: <DocumentationSent />,
      [QuotationStatus.AssinaturaContratoPendente]: <ContractSigning />,
      [QuotationStatus.AssinaturaContrato]: null,
      [QuotationStatus.CreditoLiberado]: <ReleasedCredit data={quote} />,
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: <ReprovidedLoan />,
      default: null,
    }),
    [quote],
  );
  const STEPS_ICON = useMemo(
    () => ({
      [QuotationStatus.Analise]: <CheckCircle color="success" />,
      [QuotationStatus.Aprovado]: <CheckCircle color="success" />,
      [QuotationStatus.RecusadoPeloUsuario]: <Cancel color="error" />,
      [QuotationStatus.DocumentacaoPendente]: <WatchLater color="warning" />,
      [QuotationStatus.Documentacao]: <CheckCircle color="success" />,
      [QuotationStatus.AssinaturaContratoPendente]: (
        <WatchLater color="warning" />
      ),
      [QuotationStatus.AssinaturaContrato]: <CheckCircle color="success" />,
      [QuotationStatus.CreditoLiberado]: <CheckCircle color="success" />,
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: <Cancel color="error" />,
      default: <CropSquare className="tranparent-icon" />,
    }),
    [],
  );

  const getIcon = (index: number) => {
    if (activeStep === index) return STEPS_ICON[step];

    return STEPS_ICON.default;
  };

  useEffect(() => {
    AccompanimentServices.checkCreditUnderReview()
      .then(({ data }) => {
        setQuote(data?.data);

        if (data?.data?.quotationStatusId >= 0) {
          setActiveStep(STEP_NUMBER[data?.data?.quotationStatusId]);
          setStep(data?.data?.quotationStatusId);

          setChecking(false);
        } else {
          history.push(RoutingPath.LOGGEDAREA);
        }
      })
      .finally(() => setChecking(false))
      .catch(() => history.push(RoutingPath.LOGGEDAREA));
  }, [history, STEP_NUMBER]);

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout
        containerStyles={{
          maxWidth: '1276px',
        }}
      >
        <Styled.Container>
          {checking ? (
            <Box>
              <Skeleton animation="wave" height={416} />
            </Box>
          ) : (
            <>
              <Styled.StepperCard>
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<MUIStyled.QontoConnector />}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <Styled.StepLabel StepIconComponent={qontoStepIcon}>
                        <Styled.StepLabelContent active={activeStep === index}>
                          {getIcon(index)}
                          {label}
                        </Styled.StepLabelContent>
                      </Styled.StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Styled.StepperCard>

              {STEPS_COMPONENTS[step]}
            </>
          )}
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export { Accompaniment };
