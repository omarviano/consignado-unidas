import React, { useState, useEffect, useMemo } from 'react';
import { LoggedAreaServices } from 'pages/LoggedArea/services/logged-area.services';
import { RoutingPath } from 'utils/routing';
import { useHistory } from 'react-router-dom';

import { QuotationStatus } from 'enums/quote';

import * as Styled from './styles';

interface Quote {
  id: number;
  quotationStatusId: number;
  disapprovedCheck: boolean;
}

const CreditUnderAnalysis: React.FC = () => {
  const [quote, setQuote] = useState<Quote>();
  const history = useHistory();

  const STATUS = useMemo(
    () => ({
      [QuotationStatus.Analise]: (
        <Styled.Title>Análise de crédito</Styled.Title>
      ),
      [QuotationStatus.DocumentacaoPendente]: (
        <Styled.Title>Documentação pendente</Styled.Title>
      ),
      [QuotationStatus.Documentacao]: (
        <Styled.Title>Documentação enviada</Styled.Title>
      ),
      [QuotationStatus.Aprovado]: (
        <Styled.Title>Empréstimo aprovado</Styled.Title>
      ),
      [QuotationStatus.RecusadoPeloUsuario]: (
        <Styled.Title>Empréstimo recusado</Styled.Title>
      ),
      [QuotationStatus.AssinaturaContratoPendente]: (
        <Styled.Title>Assinatura de contrato pendente</Styled.Title>
      ),
      [QuotationStatus.AssinaturaContrato]: (
        <Styled.Title>Assinatura de contrato</Styled.Title>
      ),
      [QuotationStatus.CreditoLiberado]: (
        <Styled.Title releasedCredit>Crédito liberado</Styled.Title>
      ),
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: (
        <Styled.Title>Empréstimo reprovado</Styled.Title>
      ),
      default: null,
    }),
    [],
  );

  const goToAccompaniment = async (id: number) => {
    try {
      if (
        quote?.quotationStatusId ===
        QuotationStatus.EmprestimoReprovadoPeloBanco
      )
        await LoggedAreaServices.disapprovedcheck(id);
    } finally {
      history.push(RoutingPath.ACCOMPANIMENT);
    }
  };

  useEffect(() => {
    LoggedAreaServices.checkCreditUnderReview().then(({ data }) => {
      const quote = data?.data as Quote;

      setQuote(quote);
    });
  }, []);

  return quote &&
    quote.quotationStatusId >= 0 &&
    !quote.disapprovedCheck &&
    quote.quotationStatusId !== QuotationStatus.RecusadoPeloUsuario ? (
    <Styled.Container onClick={() => goToAccompaniment(quote.id)}>
      <Styled.PreTitle>Status do seu contrato atual</Styled.PreTitle>
      {STATUS[quote.quotationStatusId ?? 'default']}
      <Styled.Text>Sua situação está sendo analisada</Styled.Text>
    </Styled.Container>
  ) : null;
};

export { CreditUnderAnalysis };
