import * as Yup from 'yup';

const schema = Yup.object().shape({
  bankCode: Yup.string().required('Informe o banco'),
  agency: Yup.string()
    .required('Informe a agência')
    .matches(/^\d+$/, 'Agência inválida'),
  accountNumber: Yup.string()
    .required('Informe sua conta corrente')
    .matches(/^\d+$/, 'Conta corrente inválida'),
  digit: Yup.string()
    .required('Informe o dígito')
    .max(99, 'Apenas dois dígitos')
    .matches(/^\d+$/, 'Dígito inválido'),
});

export { schema };
