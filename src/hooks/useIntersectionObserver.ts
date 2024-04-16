import { useEffect, useRef, useState } from "react";

type IntersectionObserverOptions = IntersectionObserverInit;

function useIntersectionObserver(
  options: IntersectionObserverOptions,
): [React.RefObject<HTMLDivElement>, boolean] {
  const [intersecting, setIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      setIntersecting(isIntersecting);
    }, options);

    const currentRef = targetRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [targetRef, intersecting];
}

export default useIntersectionObserver;
