import { renderHook, act } from '@testing-library/react-hooks';
import useModal from 'hooks/useModal';

describe('Hook Modal', () => {
  test('should be able to execute toggle modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => result.current.toggle());

    expect(result.current.open).toBe(true);
  });
});
