import { FC } from 'react';

import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import * as Styled from './styles';

const Privacy: FC = () => (
  <RouteAccess typesOfAccess="guest">
    <Layout
      containerStyles={{
        maxWidth: '1276px',
        padding: '0 24px 60px 24px',
      }}
    >
      <Styled.Container>
        <Styled.TitlePage variant="h1">AVISO DE PRIVACIDADE</Styled.TitlePage>

        <Styled.InformativeTexts>
          A Unidas e a Embracon estão comprometidas em proteger a sua
          privacidade e seus dados pessoais. O intuito deste Aviso de
          Privacidade é ser transparente e esclarecer os limites do tratamento
          das suas informações pessoais coletadas em decorrência da prestação
          dos nossos serviços e da parceria Unidas e Embracon para a oferta e
          contratação de Consórcios, especialmente quando você interage conosco
          por meio do site www.consorcio.unidas.com.br (“Site”).
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Este documento ajudará você a entender quais informações são
          coletadas, por qual motivo as coletamos, se as compartilhamos e com
          quem, bem como informará os seus direitos relativos a estes dados e
          como exercê-los ou entendê-los melhor junto à Unidas e a Embracon.
        </Styled.InformativeTexts>

        <Styled.SubTitle variant="h2">
          I. QUAIS DADOS PESSOAIS PODERÃO SER COLETADOS?
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          Para disponibilizarmos a você os melhores produtos e condições, e
          garantir que estes sejam ofertados da forma correta, precisaremos
          obter algumas informações pessoais, as quais poderão ser fornecidas
          ativamente por você por meio do seu cadastro realizado no Site. Por
          isso, coletaremos, em essência, seus dados cadastrais, ou seja, nome,
          CEP, cidade, estado, telefone e e-mail.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Em algumas situações, poderemos também coletar dados comportamentais e
          de conexão de forma automática, a partir do seu acesso e navegação no
          Site, sendo estes as características do seu dispositivo de acesso, do
          seu navegador, o IP (com data e hora), origem do IP, informações sobre
          cliques e páginas acessadas.
        </Styled.InformativeTexts>

        <Styled.SubTitle variant="h2">
          II. COMO COLETAMOS SEUS DADOS PESSOAIS?
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          Os dados pessoais que coletamos sobre você podem ter sido obtidos
          diretamente de você ou automaticamente pela Unidas:
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          <Styled.Strong>• Informações fornecidas por você</Styled.Strong> –
          Durante o seu relacionamento conosco e no âmbito da parceria entre a
          Unidas e a Embracon, nós coletaremos os dados fornecidos diretamente
          por você, por meio dos cadastros que solicitaremos que você preencha
          quando acessar o Site e estiver à procura dos nossos produtos e
          serviços de Consórcios.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          <Styled.Strong>
            • Informações coletadas de forma automática
          </Styled.Strong>{' '}
          – Nós podemos também coletar informações sobre a sua navegação e
          utilização do Site, de modo automático. Tal coleta é realizada por
          meio do uso de cookies e outras tecnologias análogas, tudo de acordo
          com o permitido em lei. Traremos abaixo uma seção específica sobre os
          cookies para conferir a você um maior nível de detalhamento.
        </Styled.InformativeTexts>

        <Styled.SubTitle variant="h2">
          III. O QUE SÃO COOKIES E COMO NÓS OS UTILIZAMOS?
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          Os Cookies são arquivos de texto que podem ser armazenados em seus
          dispositivos quando você visita os nossos sites ou utiliza os serviços
          on-line Unidas. Os cookies são utilizados para facilitar o uso e
          melhor adaptar o Site aos seus interesses e necessidades, bem como
          para compilar informações sobre a utilização de nossos sites e
          serviços, auxiliando a melhorar suas estruturas e seus conteúdos. Os
          cookies também podem ser utilizados para acelerar suas atividades e
          experiências futuras no Site. A Unidas utiliza no Site os seguintes
          tipos de cookies:
        </Styled.InformativeTexts>

        <Styled.Table>
          <Styled.Tr>
            <Styled.Th1>Tipos de Cookies</Styled.Th1>
            <Styled.Th2>O que eles fazem?</Styled.Th2>
          </Styled.Tr>
          <Styled.Tr>
            <Styled.Td1>Necesário</Styled.Td1>
            <Styled.Td2 className="border-none">
              Esses cookies são essenciais para que o Site carregue corretamente
              e permitem que você navegue em nossos sites e faça uso de todas as
              funcionalidades
            </Styled.Td2>
          </Styled.Tr>
          <Styled.Tr>
            <Styled.Td1>Desempenho</Styled.Td1>
            <Styled.Td2>
              Esses cookies nos ajudam a entender como os visitantes interagem
              com o Site, fornecendo informações sobre as áreas visitadas, o
              tempo de visita ao site e quaisquer problemas encontrados, como
              mensagens de erro.{' '}
            </Styled.Td2>
          </Styled.Tr>
          <Styled.Tr>
            <Styled.Td1>Funcionais</Styled.Td1>
            <Styled.Td2>
              Esses cookies permitem que o Site se lembre de suas escolhas, para
              proporcionar uma experiência mais personalizada. Também,
              possibilitam que os Usuários assistam a vídeos e utilizem
              ferramentas sociais, campos para comentários, fóruns, entre
              outros.
            </Styled.Td2>
          </Styled.Tr>
          <Styled.Tr>
            <Styled.Td1>Marketing</Styled.Td1>
            <Styled.Td2>
              {' '}
              Marketing Esses cookies são utilizados para fornecer mais conteúdo
              relevante e do interesse dos Usuários. Podem ser utilizados para
              apresentar publicidade mais direcionada ou limitar o número que
              esta é veiculada no Site. Também, permitem a medição da eficácia
              de uma campanha publicitária da Unidas.{' '}
            </Styled.Td2>
          </Styled.Tr>
        </Styled.Table>

        <Styled.InformativeTexts>
          A qualquer momento você poderá optar por se opor à habilitação dos
          cookies, utilizando, para tanto, as configurações de seu navegador de
          preferência. Alertamos, no entanto, que de acordo com a escolha
          realizada, certas funcionalidades dos nossos sites poderão não
          funcionar da maneira idealmente esperada. Para mais informações sobre
          como gerenciar suas preferências quanto à utilização de cookies
          diretamente em seu navegador, disponibilizamos os links abaixo para
          sua consulta:
        </Styled.InformativeTexts>
      </Styled.Container>
    </Layout>
  </RouteAccess>
);

export { Privacy };
