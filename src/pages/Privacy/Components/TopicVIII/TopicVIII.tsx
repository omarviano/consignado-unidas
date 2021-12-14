import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicVIII: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      VIII. COMO SANAR AS DÚVIDAS ADICIONAIS
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Nós da Unidas, da Consignet e da Mova, enquanto Co Controladores de dados,
      estamos disponíveis para sanar quaisquer outras dúvidas, sugestão ou
      solicitação que envolva este documento ou a proteção de seus Dados
      Pessoais. Teremos satisfação em atendê-lo!
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Para esses casos, solicitamos que acione os nossos Encarregados, o que
      pode ser feito pelos seguintes canais:{' '}
      <Styled.Email href="mailto:dpo@unidas.com.br">
        dpo@unidas.com.br
      </Styled.Email>
      ,{' '}
      <Styled.Email href="mailto:privacy@db1group.com">
        privacy@db1group.com
      </Styled.Email>{' '}
      e/ou <Styled.Email href="mailto:lgpd@mova.vc">lgpd@mova.vc</Styled.Email>
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Adicionalmente, informamos que estamos localizados nos seguintes
      endereços:
      <br />
      Unidas: Alameda Santos, nº 438, Cerqueira César, São Paulo/SP, CEP
      01418-000, www.unidas.com.br; Consignet: Av. Carneiro Leão, nº 563, Sala
      209, Maringá/PR. CEP 87014-010,{' '}
      <Styled.Link href="www.consignet.com.br" target="_blank">
        www.consignet.com.br
      </Styled.Link>
      ;, Mova: Alameda Vicente Pinzon, nº 173, 2º andar, Vila Olímpia, São
      Paulo/SP, CEP 04547-130,{' '}
      <Styled.Link href="www.mova.vc" target="_blank">
        www.mova.vc
      </Styled.Link>
      .
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicVIII };
