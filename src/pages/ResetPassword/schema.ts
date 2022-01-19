import * as Yup from 'yup';
import { ResetPasswordServices } from './services/reset-password.services';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Informe sua senha')
    .min(8, 'Senha deve conter pelo menos 8 carcteres')
    .max(30, 'Senha deve conter no máximo 30 carcteres')
    .test('password_validation', async (password, { createError, path }) => {
      if (!password || password.length < 8) return false;

      try {
        await ResetPasswordServices.validatePassword(password);

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
