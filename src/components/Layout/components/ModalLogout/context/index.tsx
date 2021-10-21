import React, {
  FC,
  useContext,
  createContext,
  useCallback,
  useState,
} from 'react';

import { ModalLogoutContextProps } from './props';

const ModalLogoutContext = createContext({} as ModalLogoutContextProps);

const ModalLogoutProvider: FC = props => {
  const { children } = props;

  const [modalActive, setModalActive] = useState(false);

  const toggleModal = useCallback(() => {
    setModalActive(prevState => !prevState);
  }, []);

  return (
    <ModalLogoutContext.Provider value={{ modalActive, toggleModal }}>
      {children}
    </ModalLogoutContext.Provider>
  );
};

export const useModalLogout = () => useContext(ModalLogoutContext);

export { ModalLogoutProvider };
