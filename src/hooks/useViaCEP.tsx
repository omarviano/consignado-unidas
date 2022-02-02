import { useState } from 'react';

import { viaCepApi } from 'services/api';
import { Document } from 'utils/document';

interface Address {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface ViaCEPApi {
  fetchCEP(cep: string | undefined): void;
  notFound: boolean;
  apiDown: boolean;
  fetching: boolean;
  address?: Address;
}

const useViaCEP = (): ViaCEPApi => {
  const [address, setAddress] = useState<Address>({
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
  });
  const [notFound, setNotFound] = useState(false);
  const [apiDown, setApiDown] = useState(false);
  const [fetching, setFetching] = useState(false);

  function resetStates() {
    resetAddress();
    setNotFound(false);
    setApiDown(false);
    setFetching(false);
  }

  function resetAddress() {
    setAddress({
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
    });
  }

  function fetchCEP(cep: string | undefined): void {
    resetStates();

    if (!cep || Document.removeMask(cep).length !== 8) return;

    setFetching(true);

    viaCepApi
      .get(`${Document.removeMask(cep)}/json/`)
      .then(({ data }) => {
        if (data.erro) {
          setNotFound(true);
          resetAddress();
        } else setAddress(data);
      })
      .catch(() => setApiDown(true))
      .finally(() => setFetching(false));
  }

  return {
    fetchCEP,
    notFound,
    apiDown,
    fetching,
    address,
  };
};

export default useViaCEP;
