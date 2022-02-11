import { renderHook, act } from '@testing-library/react-hooks';
import useViaCEP from 'hooks/useViaCEP';
import AdpterMock from 'axios-mock-adapter';
import { viaCepApi } from 'services/api';

describe('Hook ViaCEP', () => {
  test('should be able to search CEP with atributes', async () => {
    const apiResponse = {
      logradouro: 'Rua Ratisbona',
      complemento: '',
      bairro: 'Centro',
      localidade: 'Crato',
      uf: 'CE',
    };

    const apiViaCEPMock = new AdpterMock(viaCepApi, { delayResponse: 300 });
    apiViaCEPMock.onGet('63100140/json/').reply(200, apiResponse);

    const { result } = renderHook(() => useViaCEP());

    await act(() => result.current.fetchCEP('63100140'));

    expect(result.current.fetchCEP).toBeTruthy();
  });
});
