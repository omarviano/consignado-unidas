import * as Yup from 'yup';

const schema = Yup.object().shape({
  nationality: Yup.string().required('Informe a nacionalidade'),
  professional: Yup.string().required('Informe a profissão'),
  cep: Yup.string().required('Informe o cep'),
  logradouro: Yup.string().required('Informe o endereço'),
  number: Yup.number().required('Informe o número'),
  bairro: Yup.string().required('Informe o bairro'),
  complement: Yup.string().required('Informe o complemento'),
  localidade: Yup.string().required('Informe a cidade'),
  uf: Yup.string().required('Informe a estado'),
  bankCode: Yup.string().required('Informe o banco'),
  agency: Yup.number().required('Informe a agência'),
  accountNumber: Yup.number().required('Informe sua conta corrente'),
  digit: Yup.number()
    .required('Informe o dígito')
    .max(99, 'Apenas dois dígitos'),
});

const reasonsSchema = Yup.object().shape({
  reasonRefuseId: Yup.string().required('Selecione um motivo'),
});

export { schema, reasonsSchema };
