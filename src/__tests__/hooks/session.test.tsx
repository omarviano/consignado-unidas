import { renderHook, act } from '@testing-library/react-hooks';

import { useSession, SessionProvider } from 'hooks/session';

describe('Hook session', () => {
  test('should be able to execute updateSession', () => {
    const { result } = renderHook(() => useSession(), {
      wrapper: SessionProvider,
    });

    const date = new Date();

    act(() => result.current.updateSession(date));

    expect(result.current.lastSession).toBe(date);
  });
});
