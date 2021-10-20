import * as Yup from 'yup';

const schema = Yup.object().shape({
  bankCode: Yup.string().required('Informe o banco'),
  agency: Yup.string().required('Informe a agência'),
  accountNumber: Yup.string().required('Informe sua conta corrente'),
});

export { schema };
