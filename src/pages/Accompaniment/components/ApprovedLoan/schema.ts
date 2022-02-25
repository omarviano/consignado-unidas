import * as Yup from 'yup';

const schema = Yup.object().shape({
  nationality: Yup.string().required('Informe a nacionalidade').nullable(),
  professional: Yup.string().required('Informe a profissão').nullable(),
  cep: Yup.string().required('Informe o cep').nullable(),
  logradouro: Yup.string().required('Informe o endereço').nullable(),
  number: Yup.string().required('Informe o número').nullable(),
  bairro: Yup.string().required('Informe o bairro').nullable(),
  complement: Yup.string().required('Informe o complemento').nullable(),
  localidade: Yup.string().required('Informe a cidade').nullable(),
  uf: Yup.string().required('Informe a estado').nullable(),
  bankCode: Yup.string().required('Informe o banco').nullable(),
  agency: Yup.string()
    .required('Informe a agência')
    .nullable()
    .matches(/^\d+$/, 'Agência inválida'),
  accountNumber: Yup.string()
    .required('Informe sua conta corrente')
    .nullable()
    .matches(/^\d+$/, 'Conta corrente inválida'),
  digit: Yup.string()
    .required('Informe o dígito')
    .nullable()
    .max(99, 'Apenas dois dígitos')
    .matches(/^\d+$/, 'Dígito inválido'),
});

const reasonsSchema = Yup.object().shape({
  reasonRefuseId: Yup.string().required('Selecione um motivo').nullable(),
});

export { schema, reasonsSchema };
