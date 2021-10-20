import * as Yup from 'yup';

const pattern = new RegExp(/^(\d{3}\.){2}\d{3}\-\d{2}$/);

const schema = Yup.object().shape({
  cpf: Yup.string()
    .required('Campo obrigatório')
    .matches(pattern, 'Cpf inválido'),
  password: Yup.string().required('Campo obrigatório'),
});

export { schema };
