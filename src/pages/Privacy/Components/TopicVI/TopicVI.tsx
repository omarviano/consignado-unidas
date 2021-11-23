import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicVI: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      VI. COMO ARMAZENAMOS E MANTEMOS OS SEUS DADOS PESSOAIS SEGUROS?
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Os seus dados pessoais serão armazenados pela Unidas e Embracon pelo
      período em que forem necessários para as finalidades declaradas acima ou
      quando solicitado por você, conforme determina a legislação aplicável,
      sendo eliminados assim que deixarem de cumprir seu propósito. A Unidas e
      Embracon adotam possuem políticas e procedimentos internos que têm como
      objetivo garantir que seus dados sejam tratados de forma adequada e em
      observância à legislação. Possuímos um programa de segurança da informação
      robusto e adotamos diversas medidas técnicas e administrativas que
      garantem a segurança dos seus Dados Pessoais, tais como:
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      • Proteção contra acesso não autorizado aos nossos sistemas; <br />•
      Acesso somente de pessoas específicas ao local onde são armazenadas as
      suas informações pessoais, desde que este acesso seja essencial ao
      desenvolvimento da atividade pretendida; e<br /> • Providências para que
      quaisquer funcionários ou parceiros de negócio que realizarem o tratamento
      dos seus dados se comprometam a observar a legislação aplicável e adotar
      as melhores práticas para manuseio destas informações.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Apesar de adotarmos os melhores esforços para preservar a sua privacidade
      e proteger os seus dados pessoais, nenhum tratamento de dados é totalmente
      seguro estando sempre suscetível a ocorrência de falhas técnicas, vírus ou
      ações similares. Na remota hipótese de incidência de episódios desta
      natureza, a Unidas e a Embracon garantirão a adoção de todas as medidas
      cabíveis para remediar as consequências do evento, sempre garantindo a
      devida transparência a você.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicVI };
