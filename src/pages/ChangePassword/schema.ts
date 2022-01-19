import * as Yup from 'yup';
import { ChangePasswordServices } from './services/change-password.services';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .test('password_validation', async (password, { createError, path }) => {
      if (!password || password.length < 8) return false;

      try {
        await ChangePasswordServices.validatePassword(password);

        return true;
      } catch (error) {
        return createError({
          path,
          message: 'A senha não atende os requisitos mínimos',
        });
      }
    }),
  passwordConfirmation: Yup.string()
    .required('Campo obrigatório')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export { schema };
