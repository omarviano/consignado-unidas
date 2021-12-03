import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicVIII: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      VIII. COMO SANAR AS DÚVIDAS ADICIONAIS
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Nós da Unidas e da Embracon, enquanto Controladores de dados pessoais,
      estamos disponíveis para sanar quaisquer outras dúvidas, sugestão ou
      solicitação que envolva este documento ou a proteção de seus Dados
      Pessoais. Teremos satisfação em atendê-lo! Para esses casos, solicitamos
      que acione o nosso Encarregado, o que pode ser feito pelo seguinte canal:{' '}
      <Styled.Email href="mailto:dpo@unidas.com.br">
        dpo@unidas.com.br
      </Styled.Email>
      . Adicionalmente, informamos que estamos localizados nos seguintes
      endereços: Unidas: Alameda Santos, nº 438, Cerqueira César, São Paulo/SP,
      CEP 01418-000 Embracon: Alameda Europa, nº 150, Tamboré, Santana de
      Parnaíba/SP, CEP 06543-325 IX. ATUALIZAÇÃO DESTE AVISO DE PRIVACIDADE
      Nosso serviço pode mudar de tempos em tempos. Por isso, poderemos
      modificar unilateralmente esse Aviso de Privacidade a qualquer tempo e
      comunicar por meio de notificação em nosso Site. Este Aviso de Privacidade
      foi alterado pela última vez e publicado em nossa plataforma em{' '}
      <strong>25 de maio de 2021</strong>.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicVIII };
