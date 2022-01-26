/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout } from 'components/Layout';
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
import { Quote } from 'interface/quote';
import useWindowDimensions from 'hooks/windowDimensions';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';
import { RequestUnderAnalysis } from './components/RequestUnderAnalysis';
import { AwaitingSubmissionOfDocumentation } from './components/AwaitingSubmissionOfDocumentation';
import { DocumentationSent } from './components/DocumentationSent';
import { ReleasedCredit } from './components/ReleasedCredit';
import { AccompanimentServices } from './services/accompaniment.services';
import { ApprovedLoan } from './components/ApprovedLoan';
import { ReprovidedLoan } from './components/ReprovidedLoan';
import { ContractSigning } from './components/ContractSigning';
import { CardMobile } from './CardMobile';

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
  const { width } = useWindowDimensions();

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

  const checkCreditUnderReview = useCallback(() => {
    AccompanimentServices.checkCreditUnderReview()
      .then(({ data: { data } }) => {
        setQuote(data);

        if (
          data.quotationStatusId >= 0 &&
          data.quotationStatusId !== QuotationStatus.RecusadoPeloUsuario
        ) {
          setActiveStep(STEP_NUMBER[data.quotationStatusId]);
          setStep(data.quotationStatusId);

          setChecking(false);
        } else {
          history.push(RoutingPath.LOGGEDAREA);
        }
      })
      .finally(() => setChecking(false))
      .catch(() => history.push(RoutingPath.LOGGEDAREA));
  }, [history, STEP_NUMBER]);

  const STEPS_COMPONENTS = useMemo(
    () => ({
      [QuotationStatus.Analise]: <RequestUnderAnalysis />,
      [QuotationStatus.Aprovado]: (
        <ApprovedLoan onApproved={checkCreditUnderReview} />
      ),
      [QuotationStatus.RecusadoPeloUsuario]: null,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (activeStep === index) {
      return STEPS_ICON[step];
    }

    return STEPS_ICON.default;
  };

  const verifyLabel = (label: string, index: number) => {
    const labels = {
      [QuotationStatus.Aprovado]: 'Empréstimo Aprovado',
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: 'Empréstimo Reprovado',
    };

    if (index === 3) {
      if (step === QuotationStatus.RecusadoPeloUsuario)
        return labels[QuotationStatus.EmprestimoReprovadoPeloBanco];

      if (step === QuotationStatus.EmprestimoReprovadoPeloBanco)
        return labels[QuotationStatus.EmprestimoReprovadoPeloBanco];

      if (step === QuotationStatus.Aprovado)
        return labels[QuotationStatus.Aprovado];

      if (step === QuotationStatus.AssinaturaContratoPendente)
        return labels[QuotationStatus.Aprovado];

      if (step === QuotationStatus.AssinaturaContrato)
        return labels[QuotationStatus.Aprovado];

      return labels[step] || label;
    }
  };

  const getLabel = (label: string, index: number) => {
    if (verifyLabel(label, index)) {
      return verifyLabel(label, index);
    }

    return label;
  };

  const showContent = useMemo(() => {
    if (checking) {
      return (
        <Box>
          <Skeleton animation="wave" height={416} />
        </Box>
      );
    }
    return (
      <>
        {width && width > 920 ? (
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
                      {getLabel(label, index)}
                    </Styled.StepLabelContent>
                  </Styled.StepLabel>
                </Step>
              ))}
            </Stepper>
          </Styled.StepperCard>
        ) : (
          <CardMobile step={step} activeStep={activeStep} />
        )}

        {STEPS_COMPONENTS[step]}
      </>
    );
  }, [checking, step]);

  useEffect(() => {
    checkCreditUnderReview();
  }, [checkCreditUnderReview]);

  return (
    <Layout
      containerStyles={{
        maxWidth: '1276px',
      }}
    >
      <Styled.Container>{showContent}</Styled.Container>
    </Layout>
  );
};

export default withAITracking(reactPlugin, Accompaniment, 'Accompaniment');
