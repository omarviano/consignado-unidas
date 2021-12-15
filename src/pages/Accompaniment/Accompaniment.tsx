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
import { RequestUnderAnalysis } from './components/RequestUnderAnalysis';
import { AwaitingSubmissionOfDocumentation } from './components/AwaitingSubmissionOfDocumentation';
import { DocumentationSent } from './components/DocumentationSent';
import { ReleasedCredit } from './components/ReleasedCredit';
import { AccompanimentServices } from './services/accompaniment.services';

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
      0: 1,
      1: 2,
      2: 2,
      3: 3,
      4: 3,
      5: 4,
      6: 4,
      7: 5,
      8: 4,
    }),
    [],
  );

  const STEPS_COMPONENTS = useMemo(
    () => ({
      0: <RequestUnderAnalysis />,
      1: <AwaitingSubmissionOfDocumentation />,
      2: <DocumentationSent />,
      3: null,
      4: null,
      5: null,
      6: null,
      7: <ReleasedCredit data={quote} />,
      8: null,
    }),
    [quote],
  );

  const STEPS_ICON = useMemo(
    () => ({
      0: <CheckCircle color="success" />,
      1: <WatchLater color="warning" />,
      2: <CheckCircle color="success" />,
      3: <CheckCircle color="success" />,
      4: <Cancel color="error" />,
      5: <WatchLater color="warning" />,
      6: <Cancel color="error" />,
      7: <CheckCircle color="success" />,
      8: <Cancel color="error" />,
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
