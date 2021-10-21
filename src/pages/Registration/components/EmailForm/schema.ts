import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Informe seu e-mail')
    .email('Informe um e-mail válido'),
});

export { schema };
