import * as Yup from 'yup';

const schema = Yup.object().shape({
  birthDate: Yup.string().required('Informe sua data de nascimento'),
});

export { schema };
