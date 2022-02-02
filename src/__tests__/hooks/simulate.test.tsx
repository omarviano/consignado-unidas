import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useSimulateLoan, SimulateLoanProvider } from 'hooks/simulate';
import { SimulateLoanRealTimeProvider } from 'hooks/simulateRealtime';
import { AuthProvider } from 'hooks/auth';

import { api } from 'services/api';

const apiMock = new MockAdapter(api);

const Providers: React.FC = ({ children }) => (
  <AuthProvider>
    <SimulateLoanRealTimeProvider>
      <SimulateLoanProvider>{children}</SimulateLoanProvider>
    </SimulateLoanRealTimeProvider>
  </AuthProvider>
);

describe('Simulate hook', () => {
  test('should be able to simulate loan', async () => {
    const apiData = {
      admissionDate: new Date('2014-01-01T00:00:00'),
      marginAvailableValue: 523.16,
      marginTotalValue: 950,
      relationship: 'TRABALHANDO',
      value: 1000,
    };

    const apiResponse = {
      data: {
        id: 2550,
        installments: [
          {
            effectiveCostPerYear: 46.25,
            feesPerMonth: 5.1,
            quantity: 12,
            value: 117.07065990643413,
          },
          {
            effectiveCostPerYear: 45.91,
            feesPerMonth: 5.1,
            quantity: 18,
            value: 89.29687401034957,
          },
          {
            effectiveCostPerYear: 45.69,
            feesPerMonth: 5.1,
            quantity: 24,
            value: 75.93102016419613,
          },
          {
            effectiveCostPerYear: 45.54,
            feesPerMonth: 5.1,
            quantity: 30,
            value: 68.3408598672819,
          },
          {
            effectiveCostPerYear: 45.43,
            feesPerMonth: 5.1,
            quantity: 36,
            value: 63.6225951435235,
          },
          {
            effectiveCostPerYear: 45.36,
            feesPerMonth: 5.1,
            quantity: 42,
            value: 60.521504311535466,
          },
          {
            effectiveCostPerYear: 45.3,
            feesPerMonth: 5.1,
            quantity: 48,
            value: 58.409940268916074,
          },
        ],
        value: 1000,
      },
      errors: null,
      message: 'Simulação realizada com sucesso!',
      statusCode: 200,
      success: true,
    };

    apiMock.onPost('/financial/simulate', { apiData }).reply(200, apiResponse);

    const { result } = renderHook(() => useSimulateLoan(), {
      wrapper: Providers,
    });

    await act(() => result.current.simulateLoan(apiData));

    expect(result.current.simulateLoan).toBeTruthy();
  });
});
