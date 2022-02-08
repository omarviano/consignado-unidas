import { act, renderHook } from '@testing-library/react-hooks';

import useWindowDimensions from 'hooks/useWindowDimensions';

describe('Hook window dimensions', () => {
  test('should be able to exwcute window dimensions', () => {
    const { width } = useWindowDimensions();

    expect(width).toBeTruthy();
  });
});
