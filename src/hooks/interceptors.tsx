import { useMemo, useState, useCallback, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Error500 } from 'components/Error500';

import showModal from 'utils/alert';
import { api } from 'services/api';
import { useSession } from './session';

const useInterceptors = (): boolean[] => {
  const [counter, setCounter] = useState(0);
  const { updateSession } = useSession();

  const inc = useCallback(() => setCounter(state => state + 1), [setCounter]);
  const dec = useCallback(() => setCounter(state => state - 1), [setCounter]);

  const interceptors = useMemo(
    () => ({
      request: async (request: AxiosRequestConfig) => {
        inc();

        const { headers } = request;

        console.log('request', request);

        if (headers.authorization) {
          try {
            const {
              data: { data },
            } = await axios.get(
              `${process.env.REACT_APP_BASE_URL}auth/refresh-token`,
              {
                headers,
              },
            );

            request.headers.authorization = `Bearer ${data.token}`;
            api.defaults.headers.authorization = `Bearer ${data.token}`;

            updateSession(new Date());

            return Promise.resolve(request);
          } catch (error) {
            return Promise.resolve(request);
          }
        }

        updateSession(new Date());
        return request;
      },
      response: (response: AxiosResponse) => {
        dec();

        return response;
      },
      error: (error: AxiosError) => {
        dec();

        /* if (error.request.status === 0) {
          // NETWORK ERROR showModal({ content: <NetworkError /> });
          return Promise.reject(error);
        } */

        if (error.request.status >= 500) {
          showModal({ content: <Error500 /> });

          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    }),
    [inc, dec, updateSession],
  );

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use(
      interceptors.request,
      interceptors.error,
    );

    const resInterceptor = api.interceptors.response.use(
      interceptors.response,
      interceptors.error,
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return [counter > 0];
};

export default useInterceptors;
