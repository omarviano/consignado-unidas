import { useMemo, useState, useCallback, useEffect } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { SessionExpired } from 'components/SessionExpired';
import { Error500 } from 'components/Error500';

import showModal from 'utils/alert';
import { api, apiWithoutInterceptors } from 'services/api';
import { useAuth } from './auth';
import { useSession } from './session';

const useInterceptors = (): boolean[] => {
  const [counter, setCounter] = useState(0);
  const { updateSession } = useSession();
  const { refreshToken } = useAuth();

  const inc = useCallback(() => setCounter(state => state + 1), [setCounter]);
  const dec = useCallback(() => setCounter(state => state - 1), [setCounter]);

  const interceptors = useMemo(
    () => ({
      request: async (request: AxiosRequestConfig) => {
        inc();

        const { headers } = request;

        if (headers.authorization) {
          try {
            updateSession(new Date());

            const {
              data: { data },
            } = await apiWithoutInterceptors.get('auth/refresh-token', {
              headers,
            });

            refreshToken(data.token);

            request.headers.authorization = `Bearer ${data.token}`;
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
          NETWORK ERROR showModal({ content: <NetworkError /> });
          return Promise.reject(error);
        } */

        if (
          error.response?.status === 401 &&
          error.response?.request.responseURL !==
            `${process.env.REACT_APP_BASE_URL}auth`
        ) {
          showModal({ content: <SessionExpired /> });

          return Promise.reject(error);
        }

        if (error.response?.status && error.response?.status >= 500) {
          showModal({ content: <Error500 /> });

          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    }),
    [inc, dec, updateSession, refreshToken],
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
