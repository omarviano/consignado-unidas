import * as Yup from 'yup';

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

const schema = Yup.object().shape({
  birthDate: Yup.date()
    .nullable()
    .typeError('Data de nascimento inválida')
    .max(
      new Date(year, month, day),
      `Data de nascimento futura não é permitida`,
    )
    .required('Informe sua data de nascimento'),
});

export { schema };
