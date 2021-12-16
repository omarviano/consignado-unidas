import { FC } from 'react';
import * as Styled from './styles';

const Table1: FC = () => (
  <Styled.Table>
    <Styled.Tr>
      <Styled.Th1>Tipos de Cookies</Styled.Th1>
      <Styled.Th2>O que eles fazem?</Styled.Th2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Necessários</Styled.Td1>
      <Styled.Td2 className="border-none">
        Esses cookies são essenciais para que o Portal carregue corretamente e
        permitem que você seja autenticado, navegue em nossos sites e faça uso
        de todas as funcionalidades.
      </Styled.Td2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Desempenho</Styled.Td1>
      <Styled.Td2>
        Esses cookies nos ajudam a entender como os visitantes interagem com o
        Portal, fornecendo informações sobre as áreas visitadas, o tempo de
        visita ao site e quaisquer problemas encontrados, como mensagens de
        erro.
      </Styled.Td2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Funcionais</Styled.Td1>
      <Styled.Td2>
        Esses cookies permitem que o Portal se lembre de suas escolhas, para
        proporcionar uma experiência mais personalizada. Também, possibilitam
        que os Usuários assistam a vídeos e utilizem ferramentas sociais, campos
        para comentários, fóruns, entre outros.
      </Styled.Td2>
    </Styled.Tr>
    <Styled.Tr>
      <Styled.Td1>Marketing</Styled.Td1>
      <Styled.Td2>
        Esses cookies são utilizados para fornecer mais conteúdo relevante e do
        interesse dos Usuários. Podem ser utilizados para apresentar publicidade
        mais direcionada ou limitar o número que esta é veiculada no Portal.
        Também, permitem a medição da eficácia de uma campanha publicitária da
        Unidas.
      </Styled.Td2>
    </Styled.Tr>
  </Styled.Table>
);

export { Table1 };
