import { useEffect, useRef } from "react";

const useTableScroll = () => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentTableRef = tableRef.current;
      if (!currentTableRef) return;

      const scrollLeft = currentTableRef.scrollLeft;
      const leftFixedPositionElements =
        document.querySelectorAll(".fixed-left");
      const rightFixedPositionElements =
        document.querySelectorAll(".fixed-right");

      leftFixedPositionElements.forEach((el) => {
        (el as HTMLTableCellElement).style.left = scrollLeft + "px";
      });

      rightFixedPositionElements.forEach((el) => {
        (el as HTMLTableCellElement).style.right =
          (currentTableRef.scrollWidth || 0) -
          (currentTableRef.offsetWidth || 0) -
          (currentTableRef.scrollLeft || 0) +
          "px";
      });
    };

    handleScroll();

    const currentTableRef = tableRef.current;
    if (currentTableRef) {
      currentTableRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentTableRef) {
        currentTableRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return { tableRef };
};

export default useTableScroll;
