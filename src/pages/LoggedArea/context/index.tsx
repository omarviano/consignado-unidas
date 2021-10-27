import { getToken } from 'hooks/auth/storage';
import { DataProps, MarginProps } from 'interface/margin';
import { FC } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { api } from 'services/api';
import { MarginUserContextData, SimulateLoanProps } from './props';

const initialValue = {} as MarginUserContextData;

const MarginUserContext = createContext(initialValue);

export const MarginUserProvider: FC = props => {
  const { children } = props;
  api.defaults.headers.authorization = `Bearer ${getToken()?.token}`;

  const [dataMargin, setDataMargin] = useState<DataProps[]>([]);

  const [messageError, setMessageError] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

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

  const simulateLoan = useCallback(async (data: SimulateLoanProps) => {
    try {
      await api.post('/financial/simulate', data);
    } catch (error: any) {
      const { response } = error;

      const { ...errorObject } = response;
      setStatusCode(response.status);
      setMessageError(errorObject.data.message);
      setModalActive(true);
    }
  }, []);

  const resetModalActive = useCallback(() => {
    setModalActive(false);
  }, []);

  return (
    <MarginUserContext.Provider
      value={{
        dataMargin,
        statusCode,
        getMargin,
        messageError,
        modalActive,
        resetModalActive,
        simulateLoan,
      }}
    >
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
