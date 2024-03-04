import { useEffect, useRef } from 'react';

const useTableScroll = () => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = tableRef.current?.scrollLeft;
      const leftFixedPositionElements = document.querySelectorAll('.fixed-left');
      const rightFixedPositionElements = document.querySelectorAll('.fixed-right');

      leftFixedPositionElements.forEach((el) => {
        (el as HTMLTableCellElement).style.left = scrollLeft + 'px';
      });

      rightFixedPositionElements.forEach((el) => {
        (el as HTMLTableCellElement).style.right =
          (tableRef.current?.scrollWidth || 0) -
          (tableRef.current?.offsetWidth || 0) -
          (tableRef.current?.scrollLeft || 0) +
          'px';
      });
    };

    handleScroll();

    tableRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      tableRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { tableRef };
};

export default useTableScroll;
