import React, { useState, useEffect, useMemo } from 'react';
import { LoggedAreaServices } from 'pages/LoggedArea/services/logged-area.services';
import { RoutingPath } from 'utils/routing';
import * as Styled from './styles';

const CreditUnderAnalysis: React.FC = () => {
  const [creditUnderAnalysis, setCreditUnderAnalysis] = useState(false);
  const [quotationStatusId, setQuotationStatusId] = useState();
  const STATUS = useMemo(
    () => ({
      0: <Styled.Title>Análise de crédito</Styled.Title>,
      1: <Styled.Title>Documentação pendente</Styled.Title>,
      2: <Styled.Title>Documentação enviada</Styled.Title>,
      3: <Styled.Title>Empréstimo aprovado</Styled.Title>,
      4: <Styled.Title>Empréstimo recusado</Styled.Title>,
      5: <Styled.Title>Assinatura de contrato pendente</Styled.Title>,
      6: <Styled.Title>Assinatura de contrato pendente</Styled.Title>,
      7: <Styled.Title releasedCredit>Crédito liberado</Styled.Title>,
      8: <Styled.Title>Empréstimo reprovado pelo banco</Styled.Title>,
      default: null,
    }),
    [],
  );

  useEffect(() => {
    LoggedAreaServices.checkCreditUnderReview().then(({ data }) => {
      setCreditUnderAnalysis(data?.data?.quotationStatusId >= 0);
      setQuotationStatusId(data?.data?.quotationStatusId);
    });
  }, []);

  return creditUnderAnalysis ? (
    <Styled.Container to={RoutingPath.ACCOMPANIMENT}>
      <Styled.PreTitle>Status do seu contrato atual</Styled.PreTitle>
      {STATUS[quotationStatusId ?? 'default']}
      <Styled.Text>Sua situação está sendo analisada</Styled.Text>
    </Styled.Container>
  ) : null;
};

export { CreditUnderAnalysis };
