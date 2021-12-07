import { FC, Fragment } from 'react';
import { Table1 } from '../Table1';
import { Table2 } from '../Table2';

import * as Styled from './styles';

const TopicIII: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      III. O QUE SÃO COOKIES E COMO NÓS OS UTILIZAMOS?
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      Os Cookies são arquivos de texto que podem ser armazenados em seus
      dispositivos quando você visita os nossos sites ou utiliza os serviços
      on-line Unidas. Os cookies são utilizados para facilitar o uso e melhor
      adaptar o Portal aos seus interesses e necessidades, bem como para
      compilar informações sobre a utilização de nossos sites e serviços,
      auxiliando a melhorar suas estruturas e seus conteúdos. Os cookies também
      podem ser utilizados para acelerar suas atividades e experiências futuras
      no Portal.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      A Unidas utiliza no Portal os seguintes tipos de cookies:
    </Styled.InformativeTexts>

    <Table1 />

    <Styled.InformativeTexts>
      A qualquer momento você poderá́ optar por se opor à habilitação dos
      cookies, utilizando, para tanto, as configurações de seu navegador de
      preferência. Alertamos, no entanto, que de acordo com a escolha realizada,
      certas funcionalidades dos nossos sites poderão não funcionar da maneira
      idealmente esperada. A rejeição de <i>cookies</i> necessários, por
      exemplo, impedirá sua autenticação na área logada do Portal.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Para mais informações sobre como gerenciar suas preferências quanto à
      utilização de cookies diretamente em seu navegador, disponibilizamos os
      links abaixo para sua consulta:
    </Styled.InformativeTexts>

    <Table2 />
  </Fragment>
);

export { TopicIII };
