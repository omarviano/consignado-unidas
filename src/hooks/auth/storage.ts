/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AUTH_PERSIST_KEY } from 'utils/storage';
import { TokenProps } from './props';

const storage = typeof window !== 'undefined' ? localStorage : null;

export const persistToken = (data: TokenProps | null) => {
  if (!storage) return;
  storage.setItem(AUTH_PERSIST_KEY, JSON.stringify(data));
};

export const clearPersistedToken = () => {
  if (!storage) return;
  storage.removeItem(AUTH_PERSIST_KEY);
};

export const getToken = () => {
  if (!storage) return null;

  const rawToken = storage.getItem(AUTH_PERSIST_KEY);
  if (!rawToken) return null;

  return JSON.parse(rawToken) as TokenProps;
};
