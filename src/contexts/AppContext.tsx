import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface AppMessages {
  message: string;
  error?: string;
}

interface ContextData {
  appMessages: AppMessages;
  setAppMessages: (appMessages: AppMessages) => void;
}

const DEFAULT_APP_MESSAGES: AppMessages = {
  message: 'Hello, World!',
};

export const Context = createContext<ContextData | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within the AppContextProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}
const Provider = ({ children }: Props) => {
  const [appMessages, setAppMessages] =
    useState<AppMessages>(DEFAULT_APP_MESSAGES);
  const appContextState = useMemo(
    () => ({ appMessages, setAppMessages }),
    [appMessages, setAppMessages]
  );

  return (
    <Context.Provider value={appContextState}>{children}</Context.Provider>
  );
};

export default Provider;
