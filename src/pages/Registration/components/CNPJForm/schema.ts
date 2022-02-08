import { AxiosError } from 'axios';
import * as Yup from 'yup';

import { Document } from 'utils/document';
import { RegistrationServices } from 'pages/Registration/services/registration.services';

const schema = Yup.object().shape({
  cnpj: Yup.string()
    .required('Campo obrigatório')
    .min(18, 'CNPJ incompleto')
    .test('CNPJ_validation', async (cnpj, { createError, path, parent }) => {
      if (!cnpj || cnpj.length !== 18) return false;

      try {
        await RegistrationServices.validateCNPJ(
          Document.removeMask(cnpj),
          Document.removeMask(parent.cpf),
        );

        return true;
      } catch (error) {
        const { response } = error as AxiosError;

        return createError({
          path,
          message:
            response?.data?.message || 'Falha ao verificar CNPJ. Contate o RH.',
        });
      }
    }),
});

export { schema };
