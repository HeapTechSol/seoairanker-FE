import Flex from "../Flex";
import Select from "../Select";
import Button from "../Button";

import { classMapper } from "@/utils/helper";

import { usePagination } from "@/hooks/usePagination";

import { OptionsType } from "../Select/types";
import { PaginationPropsTypes } from "./types";

import { DOTS } from "@/constant/constant";

import "./Pagination.scss";
import Input from "../Input";

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

  let lastPage =
    paginationRange && paginationRange[(paginationRange?.length || 0) - 1];

  return (
    <Flex rowReverse={showSizeChanger?.rowReverse || showPageInput?.rowReverse} gap={24}>
      {showSizeChanger && (
        <Select
          size={size}
          values={{ label: `${pageSize}`, id: `${pageSize}` }}
          setValues={(val) =>
            showSizeChanger?.onPageSizeChange?.(val as OptionsType)
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
        <Button
          size={size}
          variant="text"
          onClick={onPrevious}
          disabled={currentPage === 1}
          borderRadius
        >
          Prev
        </Button>
        {paginationRange?.map((pageNumber, index) => {
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
      </div>
    </Flex>
  );
};

export default Pagination;
