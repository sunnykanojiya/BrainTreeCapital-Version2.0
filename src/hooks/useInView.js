import { useEffect, useRef, useState } from 'react';

export default function useInView(immediate = false) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => (
    immediate || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  ));

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return undefined;
    const frame = requestAnimationFrame(() => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) setVisible(true);
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [visible]);

  return [ref, visible];
}
