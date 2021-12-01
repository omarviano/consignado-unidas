import React, {
  FC,
  useContext,
  createContext,
  useCallback,
  useState,
} from 'react';

import { ModalLoginContextProps } from './props';

const ModalLoginContext = createContext({} as ModalLoginContextProps);

const ModalLoginProvider: FC = props => {
  const { children } = props;

  const [modalActive, setModalActive] = useState(false);

  const toggleModal = useCallback(() => {
    setModalActive(prevState => !prevState);
  }, []);

  return (
    <ModalLoginContext.Provider value={{ modalActive, toggleModal }}>
      {children}
    </ModalLoginContext.Provider>
  );
};

export const useModalLogin = () => useContext(ModalLoginContext);

export { ModalLoginProvider };
