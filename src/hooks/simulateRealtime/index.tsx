import { FC, useCallback, useContext, useState, createContext } from 'react';
import { getToken } from 'hooks/auth/storage';
import { RequestStatus } from 'interface/common';
import { DataSimulateProps } from 'interface/simulate';
import { api } from 'services/api';
import { DataProps, MarginProps } from 'interface/margin';
import { SimulateLoanRealTimeContextData } from './props';

const initialValue = {} as SimulateLoanRealTimeContextData;

const SimulateLoanRealTimeContext = createContext(initialValue);

export const SimulateLoanRealTimeProvider: FC = props => {
  const { children } = props;
  api.defaults.headers.authorization = getToken()?.token
    ? `Bearer ${getToken()?.token}`
    : undefined;

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    error: false,
    loading: false,
    success: false,
  });
  const [dataSimulateLoan, setDataSimulateLoan] = useState<DataSimulateProps>(
    {} as DataSimulateProps,
  );
  const [valueSliderSimulate, setValueSliderSimulate] = useState(0);
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

  const addDataSimulateLoan = useCallback((data: DataSimulateProps) => {
    setDataSimulateLoan(data);
  }, []);

  const addValueSliderSimulate = useCallback((value: number) => {
    setValueSliderSimulate(value);
  }, []);

  return (
    <SimulateLoanRealTimeContext.Provider
      value={{
        requestStatus,
        dataSimulateLoan,
        getMargin,
        dataMargin,
        addValueSliderSimulate,
        valueSliderSimulate,
        addDataSimulateLoan,
      }}
    >
      {children}
    </SimulateLoanRealTimeContext.Provider>
  );
};

export function useSimulateLoanRealTime(): SimulateLoanRealTimeContextData {
  const context = useContext(SimulateLoanRealTimeContext);

  if (!context || context === initialValue) {
    throw new Error(
      'useSimulateLoanRealTime must be used within a SimulateLoanRealTimeProvider',
    );
  }

  return context;
}
