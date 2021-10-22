import * as Yup from 'yup';
import { AxiosError } from 'axios';

import { RegistrationServices } from 'pages/Registration/services/registration.services';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Informe seu e-mail')
    .email('Informe um e-mail válido')
    .test('email_validation', async (email, { createError, path }) => {
      try {
        const EMAIL_REGEXP = /\S+@\S+\.\S+/;

        if (!email || !EMAIL_REGEXP.test(email)) return false;

        await RegistrationServices.validateEmail(email);

        return true;
      } catch (error) {
        const { response } = error as AxiosError;

        return createError({
          path,
          message:
            response?.data?.message ||
            'Falha ao verificar E-mail. Contate o RH.',
        });
      }
    }),
});

export { schema };
