import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

import Heatmap, { DataSet } from '../Heatmap';

import { GroupedTotals } from '../../types';

import {
  Container,
  HeatmapContainer,
  TooltipText,
  SuccessText,
  FailedText,
} from './Home.styled';

const Home = () => {
  const { transactions } = useAppContext();
  const [data, setData] = useState<{ [year: string]: DataSet }>({});

  const getTooltip = (date: string, success: number, failed: number) => (
    <>
      <TooltipText>{date}</TooltipText>
      <SuccessText>SUCCESS: {success}</SuccessText>
      <FailedText>FAILED: {failed}</FailedText>
    </>
  );

  const parseData = (transactions: GroupedTotals) => {
    const parsed: { [year: string]: DataSet } = {};
    Object.keys(transactions).forEach((year) => {
      const yearTransactions = transactions[year];

      parsed[year] = {};
      Object.keys(yearTransactions).forEach((t) => {
        const item = yearTransactions[t];
        parsed[year][t] = {
          value: item.success.length - item.failed.length,
          tooltip: getTooltip(t, item.success.length, item.failed.length),
        };
      });
    });
    return parsed;
  };

  useEffect(() => {
    if (transactions) setData(parseData(transactions));
  }, [transactions]);

  return (
    <Container>
      <h1>ONTO React Engineer Test - HARDIK MANDAVIA</h1>
      {data &&
        Object.keys(data).map((year) => (
          <HeatmapContainer key={year}>
            <Heatmap data={data[year]} year={year} />
          </HeatmapContainer>
        ))}
    </Container>
  );
};

export default Home;
