import { AxiosError } from 'axios';
import { api } from 'services/api';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  cpf: Yup.string()
    .required('Campo obrigatório')
    .min(14, 'CPF incompleto')
    .test('validator-custom-name', async (cpf, { createError, path }) => {
      if (!cpf || cpf.length !== 14) return false;

      try {
        await api.post('/auth/verify', {
          cpf: cpf.replace(/\D/g, ''),
        });

        return true;
      } catch (error) {
        const { response } = error as AxiosError;

        return createError({
          path,
          message:
            response?.data?.errors[0] ||
            'Falha ao verificar CPF. Contate o RH.',
        });
      }
    }),
});

export { schema };
