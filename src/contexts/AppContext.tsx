import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { GroupedTotals, Transaction } from '../types';

import DATA from '../seed/onto-transactions.json';

interface ContextData {
  transactions?: GroupedTotals;
  setTransactions: (appMessages: GroupedTotals) => void;
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
  const [transactions, setTransactions] = useState<GroupedTotals>();

  useEffect(() => {
    console.log('here');
    const grouped = (DATA as Transaction[]).reduce(
      (acc: GroupedTotals, current: Transaction) => {
        const year = new Date(Date.parse(current.date)).getFullYear();
        acc[year] = acc[year] || {};
        acc[year][current.date] = acc[year][current.date] || {
          success: [],
          failed: [],
        };
        acc[year][current.date][current.transactionType].push(current);
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
