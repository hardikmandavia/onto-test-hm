import { Container } from './Month.styled';
const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

interface Props {
  month: number;
}

const Month = ({ month }: Props) => {
  return <Container>{MONTHS[month]}</Container>;
};

export default Month;
