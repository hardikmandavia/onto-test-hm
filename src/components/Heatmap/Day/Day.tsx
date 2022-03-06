import { Container } from './Day.styled';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface Props {
  day: number;
}

const Day = ({ day }: Props) => {
  return <Container>{DAYS[day]}</Container>;
};

export default Day;
