export { default } from './Heatmap';

export interface Data {
  value: number;
  tooltip: React.ReactNode;
}

export interface DataSet {
  [key: string]: Data;
}
