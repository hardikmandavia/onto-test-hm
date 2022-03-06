import Cell from './Cell';
import Week from './Day';
import Month from './Month';

import { DataSet } from './';

import {
  Body,
  CellsWrapper,
  Container,
  DaysWrapper,
  MonthsWrapper,
} from './Heatmap.styled';

interface Props {
  year: string;
  data: DataSet;
}

const CalendarHeatmap = ({ year, data }: Props) => {
  const isLeap = (+year % 4 == 0 && +year % 100 != 0) || +year % 400 == 0;
  const cells = Array.from<number>(new Array(isLeap ? 366 : 365));
  const weeks = Array.from<number>(new Array(7));
  const months = Array.from<number>(new Array(12));

  const startDay = new Date(Date.parse(`${year}-01-01`));

  const offset = startDay.getDay() * 16;

  const getDate = (i: number) => {
    const date = new Date(startDay);
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  };

  return (
    <Container>
      <h2>{year}</h2>
      <Body>
        <DaysWrapper>
          {weeks.map((w, i) => (
            <Week key={i} day={i} />
          ))}
        </DaysWrapper>
        <CellsWrapper>
          {cells.map((c, i) => {
            const date = getDate(i);
            return (
              <Cell
                key={i}
                offset={i === 0 ? offset : undefined}
                data={data[date]}
              />
            );
          })}
        </CellsWrapper>
      </Body>
      <MonthsWrapper>
        {months.map((m, i) => (
          <Month key={i} month={i} />
        ))}
      </MonthsWrapper>
    </Container>
  );
};

export default CalendarHeatmap;
