import { getToken } from 'hooks/auth/storage';
import { DataProps, MarginProps } from 'interface/margin';
import { FC } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { api } from 'services/api';
import { SimulateLoanContextData, SimulateLoanProps } from './props';

const initialValue = {} as SimulateLoanContextData;

const SimulateLoanContext = createContext(initialValue);

export const SimulateLoanProvider: FC = props => {
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
    <SimulateLoanContext.Provider
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
    </SimulateLoanContext.Provider>
  );
};

export function useSimulateLoan(): SimulateLoanContextData {
  const context = useContext(SimulateLoanContext);

  if (!context || context === initialValue) {
    throw new Error(
      'useSimulateLoan must be used within a SimulateLoanProvider',
    );
  }

  return context;
}
