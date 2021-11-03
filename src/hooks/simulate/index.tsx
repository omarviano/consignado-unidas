import { FC, useCallback, useContext, useState, createContext } from 'react';
import { getToken } from 'hooks/auth/storage';
import { RequestStatus } from 'interface/common';
import { SimulateLoanProps, SimulateLoanResponse } from 'interface/simulate';
import { useHistory } from 'react-router-dom';
import { api } from 'services/api';
import { RoutingPath } from 'utils/routing';
import { useSimulateLoanRealTime } from 'hooks/simulateRealtime';
import { SimulateLoanContextData } from './props';

const initialValue = {} as SimulateLoanContextData;

const SimulateLoanContext = createContext(initialValue);

export const SimulateLoanProvider: FC = props => {
  const { children } = props;
  const history = useHistory();
  const { addDataSimulateLoan } = useSimulateLoanRealTime();
  api.defaults.headers.authorization = `Bearer ${getToken()?.token}`;

  const [messageError, setMessageError] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    error: false,
    loading: false,
    success: false,
  });

  const simulateLoan = useCallback(async (dataProps: SimulateLoanProps) => {
    try {
      setRequestStatus({
        error: false,
        loading: true,
        success: false,
      });

      const response = await api.post<SimulateLoanResponse>(
        '/financial/simulate',
        dataProps,
      );

      addDataSimulateLoan(response.data.data);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetModalActive = useCallback(() => {
    setModalActive(false);
  }, []);

  return (
    <SimulateLoanContext.Provider
      value={{
        statusCode,
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
