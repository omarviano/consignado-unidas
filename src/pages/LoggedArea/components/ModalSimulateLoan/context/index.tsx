import React, {
  FC,
  useContext,
  createContext,
  useCallback,
  useState,
} from 'react';

import { ModalSimulateLoanProps } from './props';

export const ModalSimulateLoanContext = createContext(
  {} as ModalSimulateLoanProps,
);

const ModalSimulateLoanProvider: FC = props => {
  const { children } = props;

  const [modalActive, setModalActive] = useState(false);

  const toggleModal = useCallback(() => {
    setModalActive(prevState => !prevState);
  }, []);

  return (
    <ModalSimulateLoanContext.Provider value={{ modalActive, toggleModal }}>
      {children}
    </ModalSimulateLoanContext.Provider>
  );
};

export const useModalSimulateLoan = () => useContext(ModalSimulateLoanContext);

export { ModalSimulateLoanProvider };
