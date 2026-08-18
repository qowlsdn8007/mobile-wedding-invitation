import styled from '@emotion/styled';
import data from 'data.json';
import { PointTitle } from '@/components/Text.tsx';

const BusInfo = () => {
  const { busInfo } = data;
  if (!busInfo) return null;

  return (
    <Wrapper>
      <PointTitle>{busInfo.title}</PointTitle>
      <RouteList>
        {busInfo.routes.map((route) => (
          <Route key={route.label}>
            <Label>{route.label}</Label>
            <Detail>
              <Time>{route.time}</Time>
              <Place>{route.place}</Place>
            </Detail>
          </Route>
        ))}
      </RouteList>
    </Wrapper>
  );
};

export default BusInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

const RouteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Route = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background-color: #f4f7f0;
  border-radius: 12px;
`;

const Label = styled.span`
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 14px;
  background-color: #e88ca6;
  color: #ffffff;
  font-size: 0.78rem;
`;

const Detail = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  text-align: left;
`;

const Time = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #2f2120;
`;

const Place = styled.span`
  font-size: 0.9rem;
  color: #44484d;
`;
