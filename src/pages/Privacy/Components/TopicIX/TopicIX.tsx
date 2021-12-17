import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicIX: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      IX. ATUALIZAÇÃO DESTE AVISO DE PRIVACIDADE
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Nosso serviço pode mudar de tempos em tempos. Por isso, poderemos
      modificar unilateralmente esse Aviso de Privacidade a qualquer tempo e
      comunicar por meio de notificação em nosso Portal.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Este Aviso de Privacidade foi alterado pela última vez e publicado em
      nossa plataforma em <strong>1º de dezembro de 2021</strong>.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicIX };
