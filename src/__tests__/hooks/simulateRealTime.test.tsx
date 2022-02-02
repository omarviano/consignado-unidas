import { act, renderHook } from '@testing-library/react-hooks';
import {
  SimulateLoanRealTimeProvider,
  useSimulateLoanRealTime,
} from 'hooks/simulateRealtime';
import MockAdapter from 'axios-mock-adapter';

import { api } from 'services/api';

import { AuthProvider } from 'hooks/auth';

const apiMock = new MockAdapter(api, { delayResponse: 200 });

const Providers: React.FC = ({ children }) => (
  <AuthProvider>
    <SimulateLoanRealTimeProvider>{children}</SimulateLoanRealTimeProvider>
  </AuthProvider>
);

describe('Hook Simulate Real Time', () => {
  test('should be able to search margens', async () => {
    const apiResponse = {
      data: [
        {
          admissionDate: new Date('2014-01-01T00:00:00'),
          availableValue: 900,
          creditLimit: 9500,
          employeeSalary: 3166.67,
          relationship: 'CLT',
          situation: 'TRABALHANDO',
          totalValue: 950,
        },
      ],
      errors: null,
      message: 'Margens recuperadas com sucesso',
      statusCode: 200,
      success: true,
    };

    apiMock.onGet('/margins').reply(200, apiResponse);

    const { result } = renderHook(() => useSimulateLoanRealTime(), {
      wrapper: Providers,
    });

    await act(() => result.current.getMargin());

    expect(result.current.dataMargin).toBeTruthy();
  });

  test('should be able to add value slider simulate', () => {
    const { result } = renderHook(() => useSimulateLoanRealTime(), {
      wrapper: Providers,
    });

    act(() => result.current.addValueSliderSimulate(1000));

    expect(result.current.valueSliderSimulate).toBe(1000);
  });

  test('should be able to add data simulate loan', async () => {
    const data = {
      id: 1,
      value: 1000,
      installments: [
        {
          effectiveCostPerYear: 46.25,
          feesPerMonth: 5.1,
          quantity: 12,
          value: 117.07065990643413,
        },
      ],
    };

    const { result } = renderHook(() => useSimulateLoanRealTime(), {
      wrapper: Providers,
    });

    await act(() => result.current.addDataSimulateLoan(data));

    expect(result.current.dataSimulateLoan.id).toBe(1);
  });
});
