import * as Yup from 'yup';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(
      /^(?=.*[A-Z])(?=(?:.*[a-zA-Z]){2})(?=(.*\d){2}).*$/,
      'A senha não atende os requisitos mínimos',
    ),
  passwordConfirmation: Yup.string()
    .required('Campo obrigatório')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export { schema };
