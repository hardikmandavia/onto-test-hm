import { useState } from 'react';
import { Container, Tooltip } from './Cell.styled';

import { Data } from '..';

interface Props {
  offset?: number;
  data?: Data;
}

const Cell = ({ data, offset }: Props) => {
  const [hover, setHover] = useState<boolean>(false);

  const getColor = ({ value }: Data) => {
    const alpha = Math.abs(value) * 0.02;
    if (value > 0) return `rgba(3, 160, 3, ${alpha})`;
    if (value < 0) return `rgba(220, 5,  3, ${alpha})`;
    if (value === 0) return `rgba(0, 0, 0, 0.1)`;
  };

  return (
    <Container
      offset={offset}
      color={data && getColor(data)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {data && hover && <Tooltip>{data?.tooltip}</Tooltip>}
    </Container>
  );
};

export default Cell;
