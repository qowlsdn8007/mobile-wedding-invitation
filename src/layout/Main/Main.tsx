import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import data from 'data.json';
import mainImg from '@/assets/images/main.jpg';

const Main = () => {
  const { greeting } = data;
  return (
    <div>
      <MainImg src={mainImg} />
      <MainTitle>{greeting.title}</MainTitle>
      <SubTitle>{greeting.eventDetail}</SubTitle>
      <ScrollIndicator>
        <span>스크롤</span>
        <Chevron viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </Chevron>
      </ScrollIndicator>
    </div>
  );
};

export default Main;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const ScrollIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 28px;
  color: #2f2120;
  opacity: 0.6;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  animation: ${bounce} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Chevron = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const MainImg = styled.img`
  border-radius: 200px 200px 0 0;
  width: 90%;
  max-width: 450px;
  padding-top: 20px;
`;

const MainTitle = styled.p`
  font-family: 'FlowerScent', cursive;
  font-size: 2rem;
  color: #2F2120;
  line-height: 120%;
  white-space: pre-line;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #2F2120;
  line-height: 140%;
  white-space: pre-line;
`;
