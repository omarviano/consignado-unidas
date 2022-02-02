import { generateRandom } from 'utils/generateRandom';
import crypto from 'crypto';

describe('util generateRandom', () => {
  test('geração de números randômicos', () => {
    Object.defineProperty(global.self, 'crypto', {
      value: {
        getRandomValues: arr => crypto.randomBytes(arr.length),
      },
    });

    const number1 = generateRandom();
    const number2 = generateRandom();

    expect(number1).not.toEqual(number2);
  });
});
