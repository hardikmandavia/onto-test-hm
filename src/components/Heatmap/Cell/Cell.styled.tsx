import styled from 'styled-components';

export const Container = styled.div<{ color?: string; offset?: number }>`
  height: 10px;
  width: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 2px;
  ${({ offset }) => offset && `margin-top: ${offset + 2}px;`};
  background-color: ${({ color }) => color || `rgba(0, 0, 0, 0.05)`};
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  font-size: 8px;
  background-color: #2e2e2e;
  border: 1px solid rgba(179, 179, 179, 0.1);
  border-radius: 4px;
  padding: 5px;
  height: 38px;
  margin-top: -54px;
`;
