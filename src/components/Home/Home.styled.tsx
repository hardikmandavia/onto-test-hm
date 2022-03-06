import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const HeatmapContainer = styled.div`
  overflow: scroll;
`;

export const TooltipText = styled.div`
  padding: 0;
  color: #ec7f25;
  margin-bottom: 8px;
`;

export const SuccessText = styled(TooltipText)`
  color: #25eca6;
  margin-bottom: 4px;
`;

export const FailedText = styled(TooltipText)`
  color: #ec254d;
  margin-bottom: 0;
`;
