import { FC, Fragment } from 'react';

import * as Styled from './styles';

const TopicVII: FC = () => (
  <Fragment>
    <Styled.SubTitle variant="h2">
      VII. QUAIS SÃO OS SEUS DIREITOS ENQUANTO TITULAR DE DADOS
    </Styled.SubTitle>

    <Styled.InformativeTexts>
      A Unidas, a Consignet e a Mova informam que, de acordo com o previsto no
      art. 18 da LGPD você tem os seguintes direitos com relação aos seus dados
      pessoais:
      <br /> • Saber se tratamos algum Dado Pessoal seu; <br />
      • Saber quais Dados Pessoais seus são tratados por nós; <br />
      • Corrigir dados incompletos, inexatos ou desatualizados, pelos meios
      exigidos pela regulamentação específica, quando necessário; <br />
      • Solicitar a anonimização, bloqueio ou eliminação de dados
      desnecessários, excessivos ou que, porventura, tenham sido tratados em
      desconformidade com a lei; <br />
      • Solicitar a portabilidade dos dados a outro fornecedor de serviço ou
      produto; <br />
      • Solicitar a eliminação dos dados tratados com ou sem o seu
      consentimento; <br />
      • Obter informações sobre as entidades públicas ou privadas com as quais
      compartilhamos os seus dados; <br />
      • Quando a atividade de tratamento necessitar do seu consentimento, você
      pode se negar a consentir. Nesse caso, iremos lhe informar sobre as
      consequências da não realização de tal atividade; e <br />
      • Quando a atividade de tratamento necessitar do seu consentimento, a
      qualquer momento você poderá revogá-lo. <br />
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Você poderá, a qualquer momento, exercer os direitos acima destacados, por
      meio do envio de e-mail para{' '}
      <Styled.Email href="mailto:dpo@unidas.com.br">
        dpo@unidas.com.br
      </Styled.Email>
      ,{' '}
      <Styled.Email href="mailto:privacy@db1group.com">
        privacy@db1group.com
      </Styled.Email>{' '}
      e/ou <Styled.Email href="mailto:lgpd@mova.vc">lgpd@mova.vc</Styled.Email>,
      com a certeza de que empreenderemos todos os esforços possíveis para
      atender à sua requisição o mais rápido possível, respeitando os prazos
      legais de atendimento. Além de tais canais, a Mova possui canais de
      atendimento próprios e automatizados que podem ser encontrados em sua{' '}
      <Styled.Link href="https://ajuda.mova.vc/hc/pt-br" target="_blank">
        Central de Ajuda // Proteção de Dados
      </Styled.Link>
      .
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Informamos que todas as requisições serão oportunizadas de forma gratuita
      e submetidas a uma forma de validação de sua identidade.
    </Styled.InformativeTexts>

    <Styled.InformativeTexts>
      Em casos específicos, é possível que a sua requisição não possa ser
      atendida, nesta hipótese, nós explicaremos os motivos que justificam o não
      atendimento.
    </Styled.InformativeTexts>
  </Fragment>
);

export { TopicVII };
