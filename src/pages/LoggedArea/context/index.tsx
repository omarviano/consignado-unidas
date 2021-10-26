import { getToken } from 'hooks/auth/storage';
import { DataProps, MarginProps } from 'interface/margin';
import { FC } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { api } from 'services/api';
import { MarginUserContextData } from './props';

const initialValue = {} as MarginUserContextData;

const MarginUserContext = createContext(initialValue);

export const MarginUserProvider: FC = props => {
  const { children } = props;
  api.defaults.headers.authorization = `Bearer ${getToken()?.token}`;

  const [dataMargin, setDataMargin] = useState<DataProps[]>([]);

  const getMargin = useCallback(async () => {
    try {
      const response = await api.get<MarginProps>('/margins');

      const { data } = response.data;

      setDataMargin(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  return (
    <MarginUserContext.Provider value={{ dataMargin, getMargin }}>
      {children}
    </MarginUserContext.Provider>
  );
};

export function useMarginUser(): MarginUserContextData {
  const context = useContext(MarginUserContext);

  if (!context || context === initialValue) {
    throw new Error('useMarginUser must be used within a MarginUserProvider');
  }

  return context;
}
