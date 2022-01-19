import { Document } from 'utils/document';

describe('Document', () => {
  test('Testando remoção em string fazias', () => {
    expect(Document.removeMask('')).toBe('');
  });
  test('Testando remoção de máscaras', () => {
    expect(Document.removeMask('999.999.999-99')).toBe('99999999999');
  });
});
