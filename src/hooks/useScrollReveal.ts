import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

/**
 * 요소가 뷰포트에 진입하면 isVisible을 true로 바꾼다.
 * 마운트 시 이미 화면 안이면(커버 등) 즉시 발화한다.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
  rootMargin = '0px 0px -10% 0px',
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // IntersectionObserver 미지원 환경: 즉시 표시
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, isVisible };
}
