import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal.ts';

interface RevealProps {
  children: ReactNode;
  /** stagger용 지연값 (예: '0.15s') */
  delay?: string;
  className?: string;
}

const RevealBox = styled.div<{ isVisible: boolean; delay: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'none' : 'translateY(24px)')};
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
  transition-delay: ${(props) => props.delay};
  will-change: opacity, transform;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const Reveal = ({ children, delay = '0s', className }: RevealProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <RevealBox ref={ref} isVisible={isVisible} delay={delay} className={className}>
      {children}
    </RevealBox>
  );
};

export default Reveal;
