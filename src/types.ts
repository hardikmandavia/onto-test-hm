export interface Transaction {
  transactionType: 'success' | 'failed';
  date: string;
  amount: number;
}

export interface TotalsByDate {
  success: Transaction[];
  failed: Transaction[];
}

export interface TotalsByYear {
  [date: string]: TotalsByDate;
}

export interface GroupedTotals {
  [year: string]: TotalsByYear;
}
