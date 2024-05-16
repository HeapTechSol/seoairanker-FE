import { useLayoutEffect, useState, useEffect } from "react";

const useResizeObserver = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const handleSize = (): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // For initial window size, since layout effects do not run on the server
  useEffect(() => {
    handleSize();
  }, []);

  return windowSize;
};

export default useResizeObserver;
