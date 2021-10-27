import React, { useState } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { Step, StepIconProps, Stepper } from '@material-ui/core';
import { CheckCircle, CropSquare } from '@material-ui/icons';

import { RequestUnderAnalysis } from './components/RequestUnderAnalysis';

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

  const getIcon = (index: number) => {
    if (index === 1) return <CheckCircle color="success" />;

    return <CropSquare className="tranparent-icon" />;
  };

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout
        containerStyles={{
          maxWidth: '1276px',
          padding: 0,
        }}
      >
        <Styled.Container>
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
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
};

export { Accompaniment };
