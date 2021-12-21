import { FC, useCallback, useContext, useState, createContext } from 'react';
import { getToken } from 'hooks/auth/storage';
import { RequestStatus } from 'interface/common';
import { DataSimulateProps } from 'interface/simulate';
import { api } from 'services/api';
import { Margin } from 'interface/margin';
import { useAuth } from 'hooks/auth';
import {
  DATA_MARGIN_KEY,
  DATA_SIMULATE_LOAN_KEY,
  VALUE_SLIDER_KEY,
} from 'utils/storage';
import { ResponseData } from 'interface/responseData';
import { SimulateLoanRealTimeContextData } from './props';

const initialValue = {} as SimulateLoanRealTimeContextData;

const SimulateLoanRealTimeContext = createContext(initialValue);

export const SimulateLoanRealTimeProvider: FC = props => {
  const { children } = props;
  const { isAuthenticated } = useAuth();
  api.defaults.headers.authorization = getToken()?.token
    ? `Bearer ${getToken()?.token}`
    : undefined;

  const [requestStatus] = useState<RequestStatus>({
    error: false,
    loading: false,
    success: false,
  });
  const [dataSimulateLoan, setDataSimulateLoan] = useState<DataSimulateProps>(
    () => {
      const storageData = localStorage.getItem(DATA_SIMULATE_LOAN_KEY);

      if (storageData) return JSON.parse(storageData);

      return {} as DataSimulateProps;
    },
  );
  const [valueSliderSimulate, setValueSliderSimulate] = useState(() => {
    const storageValue = localStorage.getItem(VALUE_SLIDER_KEY);

    if (storageValue) return Number(storageValue);

    return 0;
  });
  const [dataMargin, setDataMargin] = useState<Margin[]>(() => {
    const storageData = localStorage.getItem(DATA_MARGIN_KEY);

    if (storageData) return JSON.parse(storageData);

    return [];
  });

  const getMargin = useCallback(async () => {
    try {
      if (!isAuthenticated) return;
      const {
        data: { data },
      } = await api.get<ResponseData<Margin[]>>('/margins');

      setDataMargin(data);
      localStorage.setItem(DATA_MARGIN_KEY, JSON.stringify(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [isAuthenticated]);

  const addDataSimulateLoan = useCallback((data: DataSimulateProps) => {
    setDataSimulateLoan(data);
    localStorage.setItem(DATA_SIMULATE_LOAN_KEY, JSON.stringify(data));
  }, []);

  const addValueSliderSimulate = useCallback((value: number) => {
    setDataSimulateLoan({} as DataSimulateProps);
    setValueSliderSimulate(value);
    localStorage.setItem(VALUE_SLIDER_KEY, JSON.stringify(value));
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
