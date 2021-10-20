import * as Yup from 'yup';

const schema = Yup.object().shape({
  birthDate: Yup.date()
    .nullable()
    .typeError('Data de nascimento inválida')
    .max(new Date(), `Data de nascimento inválida`)
    .required('Informe sua data de nascimento'),
});

export { schema };
