import React, { useState, useEffect } from 'react';
import { LoggedAreaServices } from 'pages/LoggedArea/services/logged-area.services';
import { RoutingPath } from 'utils/routing';
import * as Styled from './styles';

const CreditUnderAnalysis: React.FC = () => {
  const [creditUnderAnalysis, setCreditUnderAnalysis] = useState(false);

  useEffect(() => {
    LoggedAreaServices.checkCreditUnderReview().then(({ data }) => {
      setCreditUnderAnalysis(data?.data?.quotationStatusId === 0);
    });
  }, []);

  return creditUnderAnalysis ? (
    <Styled.Container to={RoutingPath.ACCOMPANIMENT}>
      <Styled.PreTitle>Status do seu contrato atual</Styled.PreTitle>
      <Styled.Title>Análise de Crédito</Styled.Title>
      <Styled.Text>Sua situação está sendo analisada</Styled.Text>
    </Styled.Container>
  ) : null;
};

export { CreditUnderAnalysis };
