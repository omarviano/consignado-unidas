import React, { useState, useEffect, useMemo } from 'react';
import { LoggedAreaServices } from 'pages/LoggedArea/services/logged-area.services';
import { RoutingPath } from 'utils/routing';
import { useHistory } from 'react-router-dom';

import { Quote } from 'interface/quote';
import { QuotationStatus } from 'enums/quote';

import * as Styled from './styles';

const CreditUnderAnalysis: React.FC = () => {
  const [quote, setQuote] = useState<Quote>();
  const history = useHistory();

  const STATUS = useMemo(
    () => ({
      [QuotationStatus.Analise]: (
        <Styled.Title data-testid="text">Análise de crédito</Styled.Title>
      ),
      [QuotationStatus.DocumentacaoPendente]: (
        <Styled.Title data-testid="text">Documentação pendente</Styled.Title>
      ),
      [QuotationStatus.Documentacao]: (
        <Styled.Title data-testid="text">Documentação enviada</Styled.Title>
      ),
      [QuotationStatus.Aprovado]: (
        <Styled.Title data-testid="text">Empréstimo aprovado</Styled.Title>
      ),
      [QuotationStatus.RecusadoPeloUsuario]: (
        <Styled.Title data-testid="text">Empréstimo recusado</Styled.Title>
      ),
      [QuotationStatus.AssinaturaContratoPendente]: (
        <Styled.Title data-testid="text">
          Assinatura de contrato pendente
        </Styled.Title>
      ),
      [QuotationStatus.AssinaturaContrato]: (
        <Styled.Title data-testid="text">Assinatura de contrato</Styled.Title>
      ),
      [QuotationStatus.CreditoLiberado]: (
        <Styled.Title data-testid="text" releasedCredit>
          Crédito liberado
        </Styled.Title>
      ),
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: (
        <Styled.Title data-testid="text">Empréstimo reprovado</Styled.Title>
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
    LoggedAreaServices.checkCreditUnderReview().then(({ data: { data } }) => {
      setQuote(data);
    });
  }, []);

  return quote &&
    quote.quotationStatusId >= 0 &&
    !quote.disapprovedCheck &&
    quote.quotationStatusId !== QuotationStatus.RecusadoPeloUsuario ? (
    <Styled.Container
      onClick={() => goToAccompaniment(quote.id)}
      data-testid="creditUnderAnalysis"
    >
      <Styled.PreTitle>Status do seu contrato atual</Styled.PreTitle>
      {STATUS[quote.quotationStatusId ?? 'default']}
      <Styled.Text>Acompanhe sua solicitação</Styled.Text>
    </Styled.Container>
  ) : null;
};

export { CreditUnderAnalysis };
