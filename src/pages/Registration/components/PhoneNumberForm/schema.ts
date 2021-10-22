import * as Yup from 'yup';

const schema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Informe seu Telefone')
    .min(
      14,
      'Número inválido. Informe o telefone com o DDD e os 9 dígitos do número',
    ),
});

export { schema };
