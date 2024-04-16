import { useState } from "react";
import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import Cell from "./Cell";
import { classMapper } from "@/utils/helper";

import "./Cell.scss";

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({
  onChange,
}: {
  onChange: (val: Date, val1: Date) => void;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectDate = (index: number) => {
    const clickedDate = setDate(selectedDate, index);
    if (!startDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (!endDate && isAfter(clickedDate, startDate)) {
      setEndDate(clickedDate);
    } else if (!endDate && isBefore(clickedDate, startDate)) {
      setEndDate(startDate);
      setStartDate(clickedDate);
    } else if (isSameDay(startDate as Date, clickedDate as Date)) {
      setEndDate(startDate);
      setStartDate(clickedDate);
    } else {
      setStartDate(clickedDate);
      setEndDate(null);
    }
  };

  if (startDate && endDate) onChange(startDate, endDate);

  const handlePrevMonth = () =>
    setSelectedDate(sub(selectedDate, { months: 1 }));
  const handleNextMonth = () =>
    setSelectedDate(add(selectedDate, { months: 1 }));
  const handlePrevYear = () => setSelectedDate(sub(selectedDate, { years: 1 }));
  const handleNextYear = () => setSelectedDate(add(selectedDate, { years: 1 }));

  const startDateOfMonth = startOfMonth(selectedDate);
  const endDateOfMonth = endOfMonth(selectedDate);
  const numDays = differenceInDays(endDateOfMonth, startDateOfMonth) + 1;
  const prefixDays = startDateOfMonth.getDay();
  const suffixDays = 6 - endDateOfMonth.getDay();

  const items = document.querySelectorAll(".date-cells");

  const toggleActiveClass = (element: HTMLElement) => {
    removeAllActiveClasses();
    if (startDate && endDate) return;

    const hoveredIndex = Array.from(items).indexOf(element);
    const startDateElement = document.querySelector(".startDate");

    if (!startDateElement && startDate) {
      Array.from(items).forEach((item, index) => {
        if (
          startDate.getMonth() < selectedDate.getMonth() &&
          hoveredIndex > index - 1
        ) {
          item.classList.add("hovered-with-active-cell");
        }
        if (
          startDate.getMonth() > selectedDate.getMonth() &&
          hoveredIndex < index + 1
        ) {
          item.classList.add("hovered-with-active-cell");
        }
      });
      return;
    }

    const startDateIndex = Array.from(items).indexOf(
      startDateElement as HTMLElement,
    );

    for (
      let i = Math.min(hoveredIndex, startDateIndex);
      i <= Math.max(hoveredIndex, startDateIndex);
      i++
    ) {
      if (hoveredIndex < startDateIndex)
        items[i].classList.add("hovered-with-active-cell");
      else items[i].classList.add("hovered-with-active-cell");
      if (
        items[i].classList.contains("startDate") ||
        items[i].classList.contains("endDate")
      )
        items[i].classList.remove("hovered-with-active-cell");
    }
  };

  const removeAllActiveClasses = () => {
    items.forEach((item) => {
      item.classList.remove("hovered-with-active-cell");
    });
  };

  const handleMouseOver = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("cell")) {
      toggleActiveClass(target);
    }
  };

  const handleMouseOut = () => {
    removeAllActiveClasses();
  };

  const handleDateSelect = (date: number) => {
    if (startDate && endDate) {
      setStartDate(null);
      setEndDate(null);
    }
    handleSelectDate(date);
  };

  const getCellAcitveBetweenSelection = (date: number) => {
    const currentDate = setDate(selectedDate, date);
    const isActive =
      (startDate &&
        endDate &&
        isBefore(currentDate, startDate) &&
        isAfter(currentDate, endDate)) ||
      (startDate &&
        isBefore(currentDate, startDate) &&
        isBefore(currentDate, endDate as Date)) ||
      (endDate &&
        isAfter(currentDate, startDate as Date) &&
        isAfter(currentDate, endDate));

    return { isActive, currentDate };
  };

  const cellStyleClasses = (date: number) => {
    const { isActive, currentDate } = getCellAcitveBetweenSelection(date);

    return classMapper("date-cells", {
      startDate: !!(startDate && isSameDay(currentDate, startDate)),
      endDate: !!(endDate && isSameDay(currentDate, endDate)),
      activeBetween: !!(!isActive && startDate && endDate),
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Cell className="calendar-control" onClick={handlePrevYear}>
          {"<<"}
        </Cell>
        <Cell className="calendar-control" onClick={handlePrevMonth}>
          {"<"}
        </Cell>
        <Cell> {format(selectedDate, "LLLL yyyy")}</Cell>
        <Cell className="calendar-control" onClick={handleNextMonth}>
          {">"}
        </Cell>
        <Cell className="calendar-control" onClick={handleNextYear}>
          {">>"}
        </Cell>
      </div>
      <div className="week-cells-row">
        {weeks.map((week, index) => (
          <Cell key={index} className="week-cells">
            {week}
          </Cell>
        ))}
      </div>
      <div
        className="calendarGrid"
        onMouseLeave={() => startDate && !endDate && handleMouseOut()}
      >
        {Array.from({ length: prefixDays }).map((_, index) => (
          <Cell key={`prefix-${index}`} className="empty-cells" />
        ))}
        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          return (
            <Cell
              key={`${index}`}
              onMouseEnter={(e: React.SyntheticEvent) =>
                startDate && handleMouseOver(e)
              }
              onClick={() => handleDateSelect(date)}
              className={cellStyleClasses(date)}
            >
              {date}
            </Cell>
          );
        })}
        {Array.from({ length: suffixDays }).map((_, index) => (
          <Cell key={`suffix-${index}`} className="empty-cells" />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
