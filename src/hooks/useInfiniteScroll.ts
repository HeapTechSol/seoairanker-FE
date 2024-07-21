import { useCallback, useRef, useState, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
}

function useInfiniteScroll({
  onIntersect,
  rootMargin = '0px',
  threshold = 0,
  enabled = true,
}: UseInfiniteScrollOptions) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            onIntersect();
          } else {
            setIsIntersecting(false);
          }
        },
        { rootMargin, threshold }
      );

      if (node) observerRef.current.observe(node);
    },
    [rootMargin, threshold, enabled, onIntersect]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { lastElementRef, isIntersecting };
}

export default useInfiniteScroll;
