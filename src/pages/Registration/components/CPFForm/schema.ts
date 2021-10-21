import { AxiosError } from 'axios';
import { api } from 'services/api';
import * as Yup from 'yup';

import { Document } from 'utils/document';

const schema = Yup.object().shape({
  cpf: Yup.string()
    .required('Campo obrigatório')
    .min(14, 'CPF incompleto')
    .test('CPF_validation', async (cpf, { createError, path }) => {
      if (!cpf || cpf.length !== 14) return false;

      try {
        await api.post('/auth/verify', {
          cpf: Document.removeMask(cpf),
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
