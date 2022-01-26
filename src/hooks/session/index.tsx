import React, { createContext, useCallback, useState, useContext } from 'react';
import { SESSION_KEY } from 'utils/storage';
import { SessionData } from './props';

const SessionContext = createContext<SessionData>({} as SessionData);

const SessionProvider: React.FC = ({ children }) => {
  const [lastSession, setLastSession] = useState<Date>(() => {
    const session = localStorage.getItem(SESSION_KEY);

    if (session) return new Date(JSON.parse(session));

    return {} as Date;
  });

  const updateSession = useCallback((date: Date) => {
    setLastSession(date);
    localStorage.setItem(SESSION_KEY, JSON.stringify(date));
  }, []);

  return (
    <SessionContext.Provider value={{ lastSession, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};

function useSession(): SessionData {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
}

export { SessionProvider, useSession };
