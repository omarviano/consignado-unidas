import * as Yup from 'yup';
import { RegistrationServices } from 'pages/Registration/services/registration.services';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Informe sua senha')
    .min(8, 'Senha deve conter pelo menos 8 carcteres')
    .test('password_validation', async (password, { createError, path }) => {
      if (!password || password.length < 8) return false;

      try {
        await RegistrationServices.validatePassword(password);

        return true;
      } catch (error) {
        return createError({
          path,
          message: 'A senha não atende os requisitos mínimos',
        });
      }
    }),
  passwordConfirmation: Yup.string()
    .required('Confirme sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export { schema };
