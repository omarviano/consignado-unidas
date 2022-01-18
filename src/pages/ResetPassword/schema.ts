import * as Yup from 'yup';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Informe sua senha')
    .min(8, 'Senha deve conter pelo menos 8 carcteres')
    .max(30, 'Senha deve conter no máximo 30 carcteres')
    .matches(
      /^(?=.*[A-Z])(?=(?:.*[a-zA-Z]){2})(?=(.*\d){2}).*$/,
      'A senha não atende os requisitos mínimos',
    ),
  passwordConfirmation: Yup.string()
    .required('Confirme sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export { schema };
