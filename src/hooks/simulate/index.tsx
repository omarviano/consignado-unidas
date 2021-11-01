import { getToken } from 'hooks/auth/storage';
import { RequestStatus } from 'interface/common';
import { DataProps, MarginProps } from 'interface/margin';
import { FC } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from 'services/api';
import { RoutingPath } from 'utils/routing';
import { SimulateLoanContextData, SimulateLoanProps } from './props';

const initialValue = {} as SimulateLoanContextData;

const SimulateLoanContext = createContext(initialValue);

export const SimulateLoanProvider: FC = props => {
  const { children } = props;
  const history = useHistory();
  api.defaults.headers.authorization = `Bearer ${getToken()?.token}`;

  const [dataMargin, setDataMargin] = useState<DataProps[]>([]);

  const [messageError, setMessageError] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    error: false,
    loading: false,
    success: false,
  });

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

  const simulateLoan = useCallback(
    async (data: SimulateLoanProps) => {
      try {
        setRequestStatus({
          error: false,
          loading: true,
          success: false,
        });

        await api.post('/financial/simulate', data);

        setRequestStatus({
          error: false,
          loading: false,
          success: true,
        });

        history.push(RoutingPath.SIMULATE_LOAN);
      } catch (error: any) {
        const { response } = error;

        const { ...errorObject } = response;
        setStatusCode(response.status);
        setMessageError(errorObject.data.message);
        setModalActive(true);
        setRequestStatus({
          error: true,
          loading: false,
          success: false,
        });
      }
    },
    [history],
  );

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
        requestStatus,
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
