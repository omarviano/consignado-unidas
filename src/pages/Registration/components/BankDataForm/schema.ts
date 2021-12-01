import * as Yup from 'yup';

const schema = Yup.object().shape({
  bankCode: Yup.string().required('Informe o banco'),
  agency: Yup.number().required('Informe a agência'),
  accountNumber: Yup.number().required('Informe sua conta corrente'),
  digit: Yup.number()
    .required('Informe o dígito')
    .max(99, 'Apenas dois dígitos'),
});

export { schema };
