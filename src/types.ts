export interface Transaction {
  transactionType: 'success' | 'failed';
  date: string;
  amount: number;
}

export interface GroupedTransactions {
  [key: string]: {
    success: Transaction[];
    failed: Transaction[];
  };
}
