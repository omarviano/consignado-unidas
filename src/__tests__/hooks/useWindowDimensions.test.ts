import { renderHook } from '@testing-library/react-hooks';

import useWindowDimensions from 'hooks/useWindowDimensions';

describe('Hook window dimensions', () => {
  test('should be able to execute window dimensions width', () => {
    const { result } = renderHook(() => useWindowDimensions());

    const width = result.current.width && result.current.width > 720;

    expect(width).toBeTruthy();
  });

  test('should be able to execute window dimensions height', () => {
    const { result } = renderHook(() => useWindowDimensions());

    const height = result.current.height && result.current.height > 720;

    expect(height).toBeTruthy();
  });
});
