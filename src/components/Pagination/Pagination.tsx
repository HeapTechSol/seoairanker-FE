import Flex from "../Flex";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import { classMapper } from "@/utils/helper";

import { usePagination } from "@/hooks/usePagination";

import { PaginationPropsTypes } from "./types";

import { DOTS } from "@/constant/constant";

import "./Pagination.scss";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
  showSizeChanger,
  showPageInput,
  size = "sm",
  justify = "end",
  noCount = false,
}: PaginationPropsTypes) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange?.length || 0) < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage =
    paginationRange && paginationRange[(paginationRange?.length || 0) - 1];

  return (
    <Flex
      rowReverse={showSizeChanger?.rowReverse || showPageInput?.rowReverse}
      gap={24}
      justify={justify}
      align="center"
      className="pagination-properties"
    >
      {showSizeChanger && (
        <Select
          size={size}
          values={String(pageSize)}
          setValues={(val) =>
            showSizeChanger?.onPageSizeChange?.(val as string)
          }
          Options={showSizeChanger?.pageSizeOptions}
          placeholder="Select Page Size"
        />
      )}

      {showPageInput && (
        <Input
          size={size}
          type="number"
          name="pageInput"
          onChange={(val) => showPageInput?.onPageInputChange(val)}
        />
      )}

      <div
        className={classMapper("pagination-container", {
          [className || ""]: className,
        })}
      >
        {noCount && (
          <Button
            size={size}
            variant="text"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            borderRadius
          >
            First
          </Button>
        )}
        <Button
          size={size}
          variant="text"
          onClick={onPrevious}
          disabled={currentPage === 1}
          borderRadius
        >
          Prev
        </Button>
        {!noCount &&
          paginationRange?.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <div
                  key={`${pageNumber}${index}`}
                  className="pagination-item dots"
                >
                  &#8230;
                </div>
              );
            }
            return (
              <Button
                size={size}
                variant={pageNumber === currentPage ? "outlined" : "text"}
                onClick={() => onPageChange(pageNumber as number)}
                borderRadius
                key={pageNumber}
                color={pageNumber === currentPage ? "primary" : "secondary"}
              >
                {pageNumber}
              </Button>
            );
          })}

        <Button
          size={size}
          variant="text"
          onClick={onNext}
          disabled={currentPage === lastPage}
          borderRadius
        >
          Next
        </Button>
        {noCount && (
          <Button
            size={size}
            variant="text"
            onClick={() => onPageChange(lastPage as number)}
            disabled={currentPage === lastPage}
            borderRadius
          >
            Last
          </Button>
        )}
      </div>
    </Flex>
  );
};

export default Pagination;
