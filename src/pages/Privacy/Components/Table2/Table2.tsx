/* eslint-disable react/jsx-no-target-blank */
import { FC } from 'react';
import * as Styled from './styles';

const Table2: FC = () => (
  <Styled.Table>
    <Styled.Tr>
      <Styled.Th1>Navegador</Styled.Th1>
      <Styled.Th2>Link</Styled.Th2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Internet Explorer</Styled.Td1>
      <Styled.Td2 className="border-none">
        <Styled.LinkPage
          href="https://support.microsoft.com/pt-br/windows/excluir-e-gerenciar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
          target="_blank"
        >
          https://support.microsoft.com/pt-br/windows/excluir-e-gerenciar-cookies-168dab11-0753-043d-7c16-ede5947fc64d
        </Styled.LinkPage>
      </Styled.Td2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Mozilla Firefox</Styled.Td1>
      <Styled.Td2>
        <Styled.LinkPage
          href="https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop?redirectslug=ative-e-desative-os-cookies-que-os-sites-usam&redirectlocale=pt-BR"
          target="_blank"
        >
          https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop?redirectslug=ative-e-desative-os-cookies-que-os-sites-usam&redirectlocale=pt-BR
        </Styled.LinkPage>
      </Styled.Td2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Google Chrome</Styled.Td1>
      <Styled.Td2>
        <Styled.LinkPage
          href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform=Desktop&hl=pt-BR"
          target="_blank"
        >
          https://support.google.com/accounts/answer/61416?co=GENIE.Platform=Desktop&hl=pt-BR
        </Styled.LinkPage>
      </Styled.Td2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Safari</Styled.Td1>
      <Styled.Td2>
        <Styled.LinkPage
          href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
          target="_blank"
        >
          https://support.apple.com/pt-br/guide/safari/sfri11471/mac
        </Styled.LinkPage>
      </Styled.Td2>
    </Styled.Tr>
  </Styled.Table>
);

export { Table2 };
