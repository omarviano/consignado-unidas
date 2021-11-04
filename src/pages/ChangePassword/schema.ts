import * as Yup from 'yup';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  passwordConfirmation: Yup.string()
    .required('Campo obrigatório')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export { schema };
