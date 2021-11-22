import { FC } from 'react';

import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { Table1 } from './Components/Table1';
import * as Styled from './styles';
import { Table2 } from './Components/Table2';

const Privacy: FC = () => (
  <RouteAccess typesOfAccess="none">
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
            • Informações coletadas de forma automática –
          </Styled.Strong>{' '}
          Nós podemos também coletar informações sobre a sua navegação e
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

        <Table1 />

        <Styled.InformativeTexts>
          A qualquer momento você poderá optar por se opor à habilitação dos
          cookies, utilizando, para tanto, as configurações de seu navegador de
          preferência. Alertamos, no entanto, que de acordo com a escolha
          realizada, certas funcionalidades dos nossos sites poderão nãoz
          funcionar da maneira idealmente esperada. Para mais informações sobre
          como gerenciar suas preferências quanto à utilização de cookies
          diretamente em seu navegador, disponibilizamos os links abaixo para
          sua consulta:
        </Styled.InformativeTexts>

        <Table2 />

        <Styled.SubTitle variant="h2">
          IV. PARA QUAIS FINALIDADES TRATAMOS OS SEUS DADOS?
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          A Unidas e a Embracon, em conjunto, poderão utilizar seus dados
          pessoais para atender a finalidades legítimas, específicas e
          determinadas, conforme informamos a seguir:
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          <Styled.Strong>
            • Oferecimento de serviços de Consórcio:
          </Styled.Strong>{' '}
          Tratando-se da parceria da Unidas com a Embracon, nós poderemos
          utilizar os seus dados de identificação e qualificação, fornecidos por
          você nos cadastros online da Unidas, para permitir a realização e
          facilitação de diligências pré-contratuais por parte da Embracon, no
          intuito de concretizar o serviço de consórcio idealizado pela parceria
          e que poderá ser ofertado a você, durante o contato que mantiver com
          as empresas parceiras. A gestão do consórcio e das ofertas será
          realizada pela Embracon, mediante a identificação dos clientes
          derivada do cadastro Unidas e por esta fornecidas à Embracon.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          <Styled.Strong>• Contato e comunicações comerciais:</Styled.Strong> no
          momento do seu cadastro, caso você nos autorize, poderemos utilizar os
          seus dados para que possamos direcionar nossas ofertas de produtos,
          serviços e oportunidades, bem como para divulgar o lançamento de novos
          serviços, sempre relacionados às nossas atividades na Unidas, como o
          aluguel de carros e a venda de seminovos, e de nosso parceiro
          comercial Embracon, que podem ser de seu interesse. Para isso,
          adotamos o envio notícias e promoções via e-mail e telefone. Você
          poderá a qualquer momento optar pela descontinuidade do recebimento de
          nossas ofertas, ou ainda das ofertas de nossos parceiros comerciais,
          por meio do e-mail
          <Styled.Email href="mailto:dpo@unidas.com.br">
            dpo@unidas.com.br
          </Styled.Email>
          .
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          <Styled.Strong>
            • Cumprimento de obrigações legais e regulatórias –
          </Styled.Strong>{' '}
          Os dados coletados poderão ser utilizados para garantir o cumprimento
          de obrigações legais ou regulatórias às quais a Unidas e a Embracon
          estão submetidas.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          <Styled.Strong>
            • Finalidades administrativas, judiciais ou arbitrais –
          </Styled.Strong>{' '}
          Nós podemos utilizar os dados coletados para exercer nossos direitos
          no âmbito de um conflito administrativo, judicial ou ainda arbitral,
          sempre em conformidade com a legislação brasileira.
        </Styled.InformativeTexts>

        <Styled.SubTitle variant="h2">
          V. COM QUEM PODEMOS COMPARTILHAR OS SEUS DADOS
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          Para viabilizar a parceria entre Unidas e a Embracon, os dados
          pessoais coletados pela Unidas por meio do Site serão compartilhados
          com a Embracon, empresa especializada no oferecimento de serviços de
          consórcio. O tratamento conjunto dos seus dados pessoais pela Unidas e
          Embracon, em todos os casos, será realizado de forma a proteger a sua
          privacidade e em estrita observância às finalidades previamente
          informadas a você. Os seus dados pessoais também poderão ser
          compartilhados com autoridades públicas para proteção dos nossos ou
          ainda dos seus interesses na hipótese de questionamentos
          administrativos, judiciais ou ainda, arbitrais. Esta possibilidade
          também é admitida mediante ordem judicial ou pelo requerimento de
          autoridades públicas que detenham competência legal para a requisição.
          Poderemos compartilhar, ainda, os seus Dados Pessoais para apoio das
          nossas atividades, bem como de nossos parceiros comerciais, sendo que
          em qualquer hipótese de compartilhamento, sempre o faremos em estrita
          observância ao que dispõe a lei e respeitando todos os seus direitos.
        </Styled.InformativeTexts>

        <Styled.SubTitle variant="h2">
          VI. COMO ARMAZENAMOS E MANTEMOS OS SEUS DADOS PESSOAIS SEGUROS?
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          Os seus dados pessoais serão armazenados pela Unidas e Embracon pelo
          período em que forem necessários para as finalidades declaradas acima
          ou quando solicitado por você, conforme determina a legislação
          aplicável, sendo eliminados assim que deixarem de cumprir seu
          propósito. A Unidas e Embracon adotam possuem políticas e
          procedimentos internos que têm como objetivo garantir que seus dados
          sejam tratados de forma adequada e em observância à legislação.
          Possuímos um programa de segurança da informação robusto e adotamos
          diversas medidas técnicas e administrativas que garantem a segurança
          dos seus Dados Pessoais, tais como:
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          • Proteção contra acesso não autorizado aos nossos sistemas; <br />•
          Acesso somente de pessoas específicas ao local onde são armazenadas as
          suas informações pessoais, desde que este acesso seja essencial ao
          desenvolvimento da atividade pretendida; e<br /> • Providências para
          que quaisquer funcionários ou parceiros de negócio que realizarem o
          tratamento dos seus dados se comprometam a observar a legislação
          aplicável e adotar as melhores práticas para manuseio destas
          informações.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Apesar de adotarmos os melhores esforços para preservar a sua
          privacidade e proteger os seus dados pessoais, nenhum tratamento de
          dados é totalmente seguro estando sempre suscetível a ocorrência de
          falhas técnicas, vírus ou ações similares. Na remota hipótese de
          incidência de episódios desta natureza, a Unidas e a Embracon
          garantirão a adoção de todas as medidas cabíveis para remediar as
          consequências do evento, sempre garantindo a devida transparência a
          você.
        </Styled.InformativeTexts>

        <Styled.SubTitle variant="h2">
          VII. QUAIS SÃO OS SEUS DIREITOS ENQUANTO TITULAR DE DADOS
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          Unidas e a Embracon informam que você tem os seguintes direitos com
          relação aos seus dados pessoais:
          <br /> • Saber se tratamos algum Dado Pessoal seu; • Saber quais Dados
          Pessoais seus são tratados por nós;
          <br /> • Corrigir dados incompletos, inexatos ou desatualizados, pelos
          meios exigidos pela regulamentação específica, quando necessário;
          <br /> • Solicitar a anonimização, bloqueio ou eliminação de dados
          desnecessários, excessivos ou que, porventura, tenham sido tratados em
          desconformidade com a lei;
          <br /> • Solicitar a portabilidade dos dados a outro fornecedor de
          serviço ou produto;
          <br /> • Solicitar a eliminação dos dados tratados com ou sem o seu
          consentimento;
          <br /> • Obter informações sobre as entidades públicas ou privadas com
          as quais compartilhamos os seus dados;
          <br /> • Quando a atividade de tratamento necessitar do seu
          consentimento, você pode se negar a consentir. Nesse caso, iremos lhe
          informar sobre as consequências da não realização de tal atividade; e
          <br /> • Quando a atividade de tratamento necessitar do seu
          consentimento, a qualquer momento você poderá revogá-lo.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Você poderá, a qualquer momento, exercer os direitos acima destacados,
          por meio do envio de e-mail para{' '}
          <Styled.Email href="mailto:dpo@unidas.com.br">
            dpo@unidas.com.br,
          </Styled.Email>
          com a certeza de que empreenderemos todos os esforços possíveis para
          atender à sua requisição o mais rápido possível, respeitando os prazos
          legais de atendimento.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Informamos que todas as requisições serão oportunizadas de forma
          gratuita e submetidas a uma forma de validação de sua identidade.
        </Styled.InformativeTexts>

        <Styled.InformativeTexts>
          Em casos específicos, é possível que a sua requisição não possa ser
          atendida, nesta hipótese, nós explicaremos os motivos que justificam o
          não atendimento.
        </Styled.InformativeTexts>

        <Styled.SubTitle variant="h2">
          VIII. COMO SANAR AS DÚVIDAS ADICIONAIS
        </Styled.SubTitle>

        <Styled.InformativeTexts>
          Nós da Unidas e da Embracon, enquanto Controladores de dados pessoais,
          estamos disponíveis para sanar quaisquer outras dúvidas, sugestão ou
          solicitação que envolva este documento ou a proteção de seus Dados
          Pessoais. Teremos satisfação em atendê-lo! Para esses casos,
          solicitamos que acione o nosso Encarregado, o que pode ser feito pelo
          seguinte canal:{' '}
          <Styled.Email href="mailto:dpo@unidas.com.br">
            dpo@unidas.com.br
          </Styled.Email>
          . Adicionalmente, informamos que estamos localizados nos seguintes
          endereços: Unidas: Alameda Santos, nº 438, Cerqueira César, São
          Paulo/SP, CEP 01418-000 Embracon: Alameda Europa, nº 150, Tamboré,
          Santana de Parnaíba/SP, CEP 06543-325 IX. ATUALIZAÇÃO DESTE AVISO DE
          PRIVACIDADE Nosso serviço pode mudar de tempos em tempos. Por isso,
          poderemos modificar unilateralmente esse Aviso de Privacidade a
          qualquer tempo e comunicar por meio de notificação em nosso Site. Este
          Aviso de Privacidade foi alterado pela última vez e publicado em nossa
          plataforma em <strong>25 de maio de 2021</strong>.
        </Styled.InformativeTexts>
      </Styled.Container>
    </Layout>
  </RouteAccess>
);

export { Privacy };
