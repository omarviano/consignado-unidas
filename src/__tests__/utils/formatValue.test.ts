import { formatValue } from 'utils/formatValue';

describe('Formatação de valores monetários pt-br(R$)', () => {
  test('Formatação sem passar valor', () => {
    expect(formatValue()).toBe('R$\xa00,00');
  });

  test('Formatação número decimal', () => {
    expect(formatValue(11.22)).toBe('R$\xa011,22');
  });

  test('Formatação número inteiro', () => {
    expect(formatValue(11)).toBe('R$\xa011,00');
  });
});
