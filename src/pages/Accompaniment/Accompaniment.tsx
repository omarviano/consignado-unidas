import React, { useState, useEffect } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { Step, StepIconProps, Stepper, Box, Skeleton } from '@mui/material';
import { CheckCircle, CropSquare, Cancel } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import { RoutingPath } from 'utils/routing';
import { RequestUnderAnalysis } from './components/RequestUnderAnalysis';
import { AccompanimentServices } from './services/accompaniment.services';
import { ApprovedLoan } from './components/ApprovedLoan';
import { ReprovidedLoan } from './components/ReprovidedLoan';

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
  const [activeStep] = useState(1);
  const [checking, setChecking] = useState(true);
  const history = useHistory();

  const getIcon = (index: number) => {
    if (index === 1) return <CheckCircle color="success" />;
    if (index === 4) return <CheckCircle color="success" />;
    if (index === 5) return <Cancel color="error" />;

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
              {activeStep === 3 && <ApprovedLoan />}
              {activeStep === 4 && <ReprovidedLoan />}
            </>
          )}
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export { Accompaniment };
