/* eslint-disable consistent-return */
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from '@mui/icons-material';
import { QuotationStatus } from 'enums/quote';

import { ReactComponent as WatchLater } from 'assets/icons/watchLater.svg';
import { ReactComponent as Cancel } from 'assets/icons/cancel.svg';
import { ReactComponent as CheckCircle } from 'assets/icons/checkCircle.svg';

import * as Styled from './styles';
import { CardMobileProps } from './props';

const NUMBER_STEPS = 6;

const steps = [
  'Simulação',
  'Análise de Crédito',
  'Documentação',
  'Empréstimo Aprovado',
  'Assinatura de Contrato',
  'Crédito Liberado',
];

const CardMobile: FC<CardMobileProps> = props => {
  const { step, activeStep } = props;
  const [expanded, setExpanded] = useState(false);
  const [accodionHeight, setAccodionHeight] = useState(0);
  const ref = useRef<any>(null);

  const handleOpen = () => setExpanded(!expanded);

  const STEP_NUMBER = useMemo(
    () => ({
      [QuotationStatus.Analise]: 2,
      [QuotationStatus.Aprovado]: 4,
      [QuotationStatus.RecusadoPeloUsuario]: null,
      [QuotationStatus.DocumentacaoPendente]: 3,
      [QuotationStatus.Documentacao]: 3,
      [QuotationStatus.AssinaturaContratoPendente]: 5,
      [QuotationStatus.AssinaturaContrato]: 5,
      [QuotationStatus.CreditoLiberado]: 6,
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: 4,
    }),
    [],
  );

  const STEP_ACTIVE = useMemo(
    () => ({
      [QuotationStatus.Analise]: 'Análise de Crédito',
      [QuotationStatus.Aprovado]: 'Empréstimo aprovado',
      [QuotationStatus.RecusadoPeloUsuario]: null,
      [QuotationStatus.DocumentacaoPendente]: 'Documentação',
      [QuotationStatus.Documentacao]: 'Documentação',
      [QuotationStatus.AssinaturaContratoPendente]: 'Assinatura de Contrato',
      [QuotationStatus.AssinaturaContrato]: 'Assinatura de Contrato',
      [QuotationStatus.CreditoLiberado]: 'Crédito liberado',
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: 'Empréstimo reprovado',
    }),
    [],
  );

  const STEP_ICON = useMemo(
    () => ({
      [QuotationStatus.Analise]: <WatchLater />,
      [QuotationStatus.Aprovado]: <CheckCircle />,
      [QuotationStatus.RecusadoPeloUsuario]: <Cancel />,
      [QuotationStatus.DocumentacaoPendente]: <WatchLater />,
      [QuotationStatus.Documentacao]: <CheckCircle />,
      [QuotationStatus.AssinaturaContratoPendente]: <WatchLater />,
      [QuotationStatus.AssinaturaContrato]: <CheckCircle />,
      [QuotationStatus.CreditoLiberado]: <CheckCircle />,
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: <Cancel />,
      default: <></>,
    }),
    [],
  );

  const STEP_BACKGROUND_COLOR = useMemo(
    () => ({
      [QuotationStatus.Analise]: 'yellow',
      [QuotationStatus.Aprovado]: 'green',
      [QuotationStatus.RecusadoPeloUsuario]: 'red',
      [QuotationStatus.DocumentacaoPendente]: 'yellow',
      [QuotationStatus.Documentacao]: 'green',
      [QuotationStatus.AssinaturaContratoPendente]: 'yellow',
      [QuotationStatus.AssinaturaContrato]: 'green',
      [QuotationStatus.CreditoLiberado]: 'green',
      [QuotationStatus.EmprestimoReprovadoPeloBanco]: 'red',
      default: 'blue',
    }),
    [],
  );

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

  const getIcon = (index: number) => {
    if (activeStep === index) {
      return STEP_ICON[step];
    }

    return STEP_ICON.default;
  };

  const getBackgroundColor = (index: number) => {
    if (activeStep === index) {
      return STEP_BACKGROUND_COLOR[step];
    }

    return STEP_BACKGROUND_COLOR.default;
  };

  useEffect(() => {
    const getHeight = ref.current.scrollHeight;
    setAccodionHeight(getHeight);
  }, [expanded]);

  const expandedAccodion = () => {
    if (expanded) {
      return 'show';
    }
    return '';
  };

  const showIconKeyboardArrow = () => {
    if (expanded) {
      return <KeyboardArrowUpOutlined />;
    }
    return <KeyboardArrowDownOutlined />;
  };

  const showTimelineDot = (index: number) => {
    if (index === 5) {
      return (
        <Styled.TimelineDot
          colorBackground={getBackgroundColor(index)}
          numberActive={activeStep}
        >
          {getIcon(index)}
        </Styled.TimelineDot>
      );
    }
    return (
      <Styled.TimelineSeparator active={activeStep === index}>
        <Styled.TimelineDot colorBackground={getBackgroundColor(index)}>
          {getIcon(index)}
        </Styled.TimelineDot>
        <Styled.TimelineConnector />
      </Styled.TimelineSeparator>
    );
  };

  return (
    <Styled.Card onClick={handleOpen}>
      <Styled.Header>
        <Styled.StepByStepText>
          Passo {STEP_NUMBER[step]} de {NUMBER_STEPS}
        </Styled.StepByStepText>
        <Styled.StepText>
          {STEP_ACTIVE[step]}
          {STEP_ICON[step]}
        </Styled.StepText>
      </Styled.Header>
      <Styled.Content
        className={expandedAccodion()}
        setHeight={accodionHeight}
        ref={ref}
      >
        <div ref={ref}>
          <Styled.Timeline>
            {steps.map((label, index) => (
              <>
                <Styled.TimelineItem>
                  {showTimelineDot(index)}
                  <Styled.TimelineContent active={activeStep === index}>
                    {getLabel(label, index)}
                  </Styled.TimelineContent>
                </Styled.TimelineItem>
              </>
            ))}
          </Styled.Timeline>
        </div>
      </Styled.Content>
      <Styled.IconContainer>{showIconKeyboardArrow()}</Styled.IconContainer>
    </Styled.Card>
  );
};

export { CardMobile };
