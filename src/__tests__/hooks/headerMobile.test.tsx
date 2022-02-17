import { renderHook, act } from '@testing-library/react-hooks';

import { useHeaderMobile, HeaderMobileProvider } from 'hooks/headerMobile';

describe('Hook header mobile', () => {
  test('should be able to execute toggle header mobile', () => {
    const { result } = renderHook(() => useHeaderMobile(), {
      wrapper: HeaderMobileProvider,
    });

    act(() => result.current.toggle());

    expect(result.current.open).toBe(true);
  });
});
