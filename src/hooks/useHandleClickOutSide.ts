import { useEffect } from 'react';

const useHandleClickOutSide = (ref: React.RefObject<HTMLDivElement>, handler: (event: Event) => void) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target as HTMLDivElement) ||
        (event.target as HTMLDivElement).classList.contains('humbarger-icon')
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useHandleClickOutSide;
