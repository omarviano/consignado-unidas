export interface DataQuestionsProps {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    questionAnswered: string;
  }[];
}

export const DataQuestions: DataQuestionsProps[] = [
  {
    id: 'group1',
    title: 'Contratação de crédito',
    items: [
      {
        id: 'question1',
        title: 'O que é o Crédito Consignado?',
        questionAnswered:
          'O Crédito Consignado é um dos empréstimos mais acessíveis do mercado, com juros mais baixos e análise de crédito bem mais simples do que os empréstimos tradicionais. A principal característica desse modelo é que suas parcelas são descontadas diretamente na folha salarial do beneficiário, não podendo ultrapassar de 30% do seu salário líquido.',
      },
      {
        id: 'question2',
        title: 'Quem pode contratar o Unidas Consignado?',
        questionAnswered:
          'Podem contratar o Unidas Consignado todos os colaboradores Unidas com carteira assinada que estão vinculados à empresa há, pelo menos, seis meses.',
      },
      {
        id: 'question3',
        title: 'Como contratar o Unidas Consignado?',
        questionAnswered:
          'Caso seja o primeiro acesso, cadastre-se na plataforma e verifique a sua conta clicando no link enviado para o e-mail informado. Depois de confirmar o cadastro, faça o login no site e simule o valor que deseja receber clicando em “Simular Empréstimo”.\nO seu pedido passará por uma simples análise de crédito e, se aprovado, será solicitado que você confirme os seus dados bancários e tire foto dos seus documentos. Após isso, você receberá uma proposta de empréstimo. Caso você aceite a proposta, você receberá o contrato para assinar digitalmente para então receber o valor do empréstimo em sua conta bancária.',
      },
      {
        id: 'question4',
        title: 'Quanto tempo demora para o dinheiro cair na conta?',
        questionAnswered:
          'Após ter o seu empréstimo aprovado e ter assinado o contrato, o dinheiro será depositado na conta bancária informada em até três dias úteis.',
      },
      {
        id: 'question5',
        title:
          'É possível fazer simulação do empréstimo consignado sem contratá-lo?',
        questionAnswered:
          'Sim, você pode simular o empréstimo quantas vezes quiser sem compromisso de contratação.',
      },
      {
        id: 'question55',
        title: 'O que é margem consignável?',
        questionAnswered:
          'Margem consignável é o valor máximo que você pode comprometer da sua renda para pagar as parcelas do empréstimo. Nesse caso, o valor descontado mensalmente da folha de pagamento não pode ultrapassar 30% do salário líquido.',
      },
      {
        id: 'question6',
        title:
          'É possível ter mais de um empréstimo consignado ao mesmo tempo?',
        questionAnswered:
          'Você pode ter mais de um empréstimo consignado ao mesmo tempo, desde que faça a contratação de cada um de forma individual e que a soma das parcelas mensais dos empréstimos não ultrapasse a margem consignável de 30% do seu salário líquido.\nExemplo: um colaborador que ganha R$1.000 mensais (após desconto de impostos e benefícios) pode solicitar quantos empréstimos consignados quiser, contanto que a soma das parcelas não seja maior do que R$300/mês, ou seja, 30% de sua renda.',
      },
      {
        id: 'question7',
        title: 'Como é possível ver a minha margem consignável?',
        questionAnswered:
          'O valor atualizado da sua margem consignável fica disponível na página inicial do portal, após fazer o login no site.',
      },
      {
        id: 'question9',
        title: 'Qual a taxa de juros?',
        questionAnswered:
          'A taxa de juros varia conforme a análise de crédito e é informada após a simulação e antes da decisão de contratar o empréstimo.',
      },
      {
        id: 'question10',
        title: 'Qual o prazo máximo para pagar?',
        questionAnswered:
          'As opções de prazo do empréstimo são mostradas após a simulação do crédito, podendo variar de 12 a 48 parcelas mensais.',
      },
      {
        id: 'question11',
        title:
          'É necessário fazer um pagamento antecipado para receber o dinheiro?',
        questionAnswered:
          'O Unidas Consignado nunca pedirá nenhum tipo de pagamento antecipado para liberar o empréstimo ou a devolução do valor depositado. Fique atento em caso de recebimento desse tipo de solicitação e não realize nenhum pagamento sem antes entrar em contato pelo e-mail consignado@unidas.com.br para confirmar sua veracidade.',
      },
    ],
  },
  {
    id: 'group2',
    title: 'Antecipação e quitação',
    items: [
      {
        id: 'question12',
        title: 'É possível quitar as parcelas que faltam de uma só vez?',
        questionAnswered:
          'Sim. Nesse caso, você pode enviar um e-mail para consignado@unidas.com.br com os detalhes do pedido e aguardar para receber um boleto com o saldo devedor remanescente com desconto de juros. O boleto deve ser pago em até dois dias úteis após a solicitação.',
      },
    ],
  },
  {
    id: 'group3',
    title: 'Desligamento',
    items: [
      {
        id: 'question13',
        title: 'O que acontece com o meu empréstimo se eu sair da empresa?',
        questionAnswered:
          'Nesse caso, se o pagamento do seu empréstimo ainda não foi realizado, será descontado o valor de 30% da sua verba rescisória para fazer a quitação. E se ainda houver alguma dívida, o empréstimo consignado se torna um empréstimo pessoal, que deverá ser pago por boletos diretamente ao banco responsável. Mas não se preocupe: o valor das parcelas e das taxas são mantidas e podem ser renegociadas diretamente com a instituição financeira, ok?',
      },
    ],
  },
  {
    id: 'group4',
    title: 'Dados cadastrais',
    items: [
      {
        id: 'question13',
        title: 'O que fazer se eu esquecer minha senha?',
        questionAnswered:
          'Na área de login, clique em “Esqueci minha senha” e siga as instruções para alterá-la.',
      },
      {
        id: 'question14',
        title: 'Meus dados cadastrais estão errados. Como posso alterá-los?',
        questionAnswered:
          'Por favor, mande um e-mail para consignado@unidas.com.br solicitando a alteração dos seus dados cadastrais.',
      },
    ],
  },
  {
    id: 'group5',
    title: 'Contato',
    items: [
      {
        id: 'question15',
        title: 'Com quem posso falar em caso de dúvidas?',
        questionAnswered:
          'Em caso de dúvidas ou problemas, você pode nos contatar pelo e-mail consignado@unidas.com.br.',
      },
      {
        id: 'question16',
        title:
          'Com quem posso falar para dar uma sugestão ou fazer um comentário?',
        questionAnswered:
          'Queremos ouvir a sua opinião! Mande os seus comentários para o e-mail consignado@unidas.com.br.',
      },
    ],
  },
];
