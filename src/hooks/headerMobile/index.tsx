import { FC } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { HeaderMobileContextData } from './props';

const initialValue = {} as HeaderMobileContextData;

const HeaderMobileContext = createContext(initialValue);

export const HeaderMobileProvider: FC = props => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <HeaderMobileContext.Provider value={{ open, toggle }}>
      {children}
    </HeaderMobileContext.Provider>
  );
};

export function useHeaderMobile(): HeaderMobileContextData {
  const context = useContext(HeaderMobileContext);

  if (!context || context === initialValue) {
    throw new Error(
      'useHeaderMobile must be used within a HeaderMobileProvider',
    );
  }

  return context;
}
