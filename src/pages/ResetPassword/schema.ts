import * as Yup from 'yup';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Informe sua senha')
    .min(6, 'Senha deve conter pelo menos 6 carcteres'),
  passwordConfirmation: Yup.string()
    .required('Confirme sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export { schema };
