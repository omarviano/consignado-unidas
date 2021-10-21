export function formatValue(value: number): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formated = formatter.format(value);

  return formated;
}
