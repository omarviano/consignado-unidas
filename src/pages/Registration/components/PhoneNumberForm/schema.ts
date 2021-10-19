import * as Yup from 'yup';

const schema = Yup.object().shape({
  phoneNumber: Yup.string().required('Informe seu Telefone'),
});

export { schema };
