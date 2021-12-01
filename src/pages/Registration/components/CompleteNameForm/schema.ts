import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Informe seu nome completo'),
});

export { schema };
