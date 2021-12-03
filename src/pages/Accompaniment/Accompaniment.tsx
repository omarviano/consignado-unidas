import React, { useState, useEffect } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { Step, StepIconProps, Stepper, Box, Skeleton } from '@mui/material';
import { CheckCircle, CropSquare, WatchLater } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import { RoutingPath } from 'utils/routing';
import { RequestUnderAnalysis } from './components/RequestUnderAnalysis';
import { AwaitingSubmissionOfDocumentation } from './components/AwaitingSubmissionOfDocumentation';
import { DocumentationSent } from './components/DocumentationSent';
import { AccompanimentServices } from './services/accompaniment.services';

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

function QontoStepIcon(props: StepIconProps) {
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
}

const Accompaniment: React.FC = () => {
  const [activeStep] = useState(2);
  const [checking, setChecking] = useState(true);
  const history = useHistory();

  const getIcon = (index: number) => {
    if (index === 1 && activeStep === 1) return <CheckCircle color="success" />;

    if (index === 2 && activeStep === 2) return <WatchLater color="warning" />;

    return <CropSquare className="tranparent-icon" />;
  };

  useEffect(() => {
    AccompanimentServices.checkCreditUnderReview()
      .then(({ data }) => {
        if (data?.data?.quotationStatusId !== 0)
          history.push(RoutingPath.LOGGEDAREA);

        setChecking(false);
      })
      .catch(() => history.push(RoutingPath.LOGGEDAREA));
  }, [history]);

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
                      <Styled.StepLabel StepIconComponent={QontoStepIcon}>
                        <Styled.StepLabelContent active={activeStep === index}>
                          {getIcon(index)}
                          {label}
                        </Styled.StepLabelContent>
                      </Styled.StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Styled.StepperCard>

              {activeStep === 1 && <RequestUnderAnalysis />}
              {activeStep === 2 && <AwaitingSubmissionOfDocumentation />}
              {activeStep === 3 && <DocumentationSent />}
            </>
          )}
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export { Accompaniment };
