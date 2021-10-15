import * as Yup from 'yup';

const schema = Yup.object().shape({
  cpf: Yup.string().required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

export { schema };
