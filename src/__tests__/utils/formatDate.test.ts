import { formatDate } from 'utils/formatDate';

describe('Formatação de datas', () => {
  test('Formatação data nula', () => {
    expect(formatDate(null)).toBe(null);
  });

  test('Formatação  pt-br', () => {
    const date = new Date('2014-01-01T00:00:00');

    expect(formatDate(date)).toBe('01/01/2014');
  });
});
