import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { GroupedTransactions, Transaction } from '../types';

import DATA from '../seed/onto-transactions.json';

interface ContextData {
  transactions?: GroupedTransactions;
  setTransactions: (appMessages: GroupedTransactions) => void;
}

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
  const [transactions, setTransactions] = useState<GroupedTransactions>();

  useEffect(() => {
    console.log('here');
    const grouped = (DATA as Transaction[]).reduce(
      (acc: GroupedTransactions, current: Transaction) => {
        acc[current.date] = acc[current.date] || { success: [], failed: [] };
        acc[current.date][current.transactionType].push(current);
        return acc;
      },
      {}
    );

    setTransactions(grouped);
  }, []);

  const appContextState = useMemo(
    () => ({ transactions, setTransactions }),
    [transactions, setTransactions]
  );

  return (
    <Context.Provider value={appContextState}>{children}</Context.Provider>
  );
};

export default Provider;
