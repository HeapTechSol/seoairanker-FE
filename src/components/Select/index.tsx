import React, { useRef, useState, useCallback, useEffect } from "react";

import Chip from "../Chip";
import Flex from "../Flex";
import Input from "../Input";
import Button from "../Button";
import Checkbox from "../Checkbox";

import SearchIcon from "@/assets/icons/search_icon.svg";

import {
  classMapper,
  isEmpty,
  toggleCSSClass,
  toggleCSSClasses,
} from "@/utils/helper";

import useHandleClickOutSide from "@/hooks/useHandleClickOutSide";

import { OptionsType, SelectProps } from "./types";

import "./Select.scss";

const Select = ({
  Options,
  searchable = false,
  multiple = false,
  selectAllOption = false,
  values,
  placeholder,
  color = "primary",
  size = "sm",
  minWidth = 100,
  title,
  titlePosition = "inside",
  setValues,
}: SelectProps) => {
  const selectedOptionsRef = useRef<HTMLDivElement>(null);
  const inputToggleBtnRef = useRef<HTMLInputElement>(null);
  const toggleOptionListRef = useRef<HTMLDivElement | null>(null);
  const selectContainerRef = useRef<HTMLDivElement | null>(null);

  const [warpedCounter, setWarpedCounter] = useState<number>(0);
  const [query, setQuery] = useState({ label: "", value: "" });

  useHandleClickOutSide(selectContainerRef, () => {
    toggleCSSClass(toggleOptionListRef.current, "open", "remove");
    optionsListToggler(false);
  });

  const optionsListToggler = (state: boolean) => {
    if (inputToggleBtnRef.current) inputToggleBtnRef.current.checked = state;
  };

  const selectHandler = (selectedValue: OptionsType) => {
    if (query) setQuery({ label: "", value: "" });

    if (multiple && Array.isArray(values)) {
      const alreadySelected = values.find(
        (value) => value.id === selectedValue.id
      );

      if (alreadySelected) {
        setValues?.([
          ...(values?.filter((val) => val.id !== selectedValue.id) ?? []),
        ]);
        return;
      }

      setValues?.([...(values ?? []), selectedValue]);
      return;
    }

    setValues?.(selectedValue);

    if (inputToggleBtnRef.current) {
      toggleCSSClass(toggleOptionListRef.current, "open", "remove");
    }

    optionsListToggler(false);
  };

  const checkAll = () => {
    if ((values as OptionsType[])?.length != Options?.length)
      return setValues?.(Options);
    setValues?.([]);
  };

  const removeSelectedOption = (id: string) =>
    setValues?.((values as OptionsType[])?.filter((value) => value.id != id));

  const toggleOptionsList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      return toggleCSSClass(toggleOptionListRef.current, "open", "add");
    toggleCSSClass(toggleOptionListRef.current, "open", "remove");
  };

  const handleFocusOnInput = (e: React.SyntheticEvent) => {
    const clickedElement = e.target as HTMLDivElement;
    if (
      clickedElement.classList.contains("selected") ||
      clickedElement.classList.contains("toggle-arrow-icon")
    )
      return;
    if (inputToggleBtnRef.current && !inputToggleBtnRef.current.checked) {
      toggleCSSClass(toggleOptionListRef.current, "open", "add");
      optionsListToggler(true);
      return;
    }
    if (inputToggleBtnRef.current && inputToggleBtnRef.current.checked) {
      optionsListToggler(false);
      toggleCSSClass(toggleOptionListRef.current, "open", "remove");
    }
  };

  const closeOptionList = () => {
    if (inputToggleBtnRef.current)
      toggleCSSClass(toggleOptionListRef.current, "open", "remove");
    optionsListToggler(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSearch = (e: any) => {
    if (!searchable) return e.preventDefault();
    setQuery({ label: e.target.value, value: e.target.value });
  };

  const reSizeHandler = useCallback(() => {
    if (selectedOptionsRef.current && selectContainerRef.current) {
      const selectedOptionsCollection = Array.from(
        selectedOptionsRef.current.children
      );
      const selectContainer =
        selectContainerRef.current?.getBoundingClientRect();
      const selectedOption = selectedOptionsCollection?.filter(
        (item) => !item.classList.contains("options-count")
      );
      const optionsInContainer = selectedOption?.filter(
        (elm) => elm.getBoundingClientRect().right < selectContainer.right - 140
      );
      toggleCSSClasses(optionsInContainer, "excessive-width", "remove");
      const optionsOutContainer = selectedOption?.filter(
        (elm) => elm.getBoundingClientRect().right > selectContainer.right - 140
      );
      toggleCSSClasses(optionsOutContainer, "excessive-width", "add");
      setWarpedCounter(
        document.getElementsByClassName("excessive-width")?.length
      );
    }
  }, [selectedOptionsRef]);

  useEffect(() => {
    if (multiple) {
      reSizeHandler();
      window.addEventListener("resize", reSizeHandler);
    }
    return () => {
      window.removeEventListener("resize", reSizeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reSizeHandler, values]);

  const selected = Array.isArray(values)
    ? values?.flatMap((val) => Options?.filter((item) => item?.id === val?.id))
    : Options?.filter((item) => item.id === values?.id)[0];
  placeholder;
  const selectedOptions = Array.isArray(selected) ? (
    selected.map((item, idx) => (
      <Chip
        circled
        size={size}
        key={`${idx}${item?.label}`}
        text={item.label}
        onClick={(e) => {
          e.stopPropagation();
          removeSelectedOption(item.id);
        }}
      />
    ))
  ) : (
    <span className="single-selected-option">{selected?.label}</span>
  );

  const counter = !!warpedCounter && (
    <Chip
      className="options-count"
      circled
      variant="filled"
      size={size}
      text={`${warpedCounter} More`}
    />
  );

  const queriedOptions = Options?.filter((item) =>
    item.label.toLowerCase().includes(query.label.toLowerCase())
  );

  const singleOptionsList = queriedOptions.map((opt, idx) => (
    <label
      style={{ cursor: "pointer" }}
      htmlFor={opt?.id + idx}
      key={`${idx}${opt?.id}`}
      onClick={() => selectHandler(opt)}
    >
      {opt?.label}
    </label>
  ));

  const multipleOptionsList =
    multiple &&
    queriedOptions.map((opt, idx) => (
      <Checkbox
        key={`${opt.label}${idx}`}
        name={opt.label}
        checked={(values as OptionsType[])?.some(
          (value) => value.id === opt.id
        )}
        onChange={() => selectHandler(opt)}
        label={opt?.label}
        labelPosition="right"
        size={size}
      />
    ));

  const checkAllOption = selectAllOption && !query.label && (
    <Checkbox
      name={"All"}
      onChange={checkAll}
      checked={(values as OptionsType[])?.length == Options?.length}
      label="All"
      labelPosition="right"
      indeterminate={
        ((values as OptionsType[])?.length ? true : false) &&
        (values as OptionsType[])?.length !== Options?.length
      }
      size={size}
    />
  );

  const optionsList = multiple ? multipleOptionsList : singleOptionsList;
  const containerStyleClasses = classMapper("select-container", {
    [color]: color,
  });
  const selectedOptionsContainerStyleClasses = classMapper("selected-options", {
    [size]: size,
  });

  const placeholderHandler = () => {
    if (placeholder)
      return <span className="placeholder-text">{placeholder}</span>;
  };

  const topTitle = titlePosition === "top" && (
    <label htmlFor={title}>{title}</label>
  );

  return (
    <Flex
      vertical
      gap={8}
      align="start"
      className={classMapper("select", {
        [titlePosition]: titlePosition && title,
      })}
    >
      {topTitle}
      <div
        className={containerStyleClasses}
        ref={selectContainerRef}
        style={{ minWidth: minWidth, width: "100%" }}
      >
        <Flex
          align="center"
          justify="between"
          className={selectedOptionsContainerStyleClasses}
          onClick={handleFocusOnInput}
        >
          {title && <legend>{title}</legend>}
          <input
            type="checkbox"
            id={title}
            className="toggle-arrow-icon"
            onChange={toggleOptionsList}
            ref={inputToggleBtnRef}
          />
          <Flex
            padding={"0px 8px"}
            gap={5}
            align="center"
            ref={selectedOptionsRef}
            className="selected-options-list"
          >
            {isEmpty(selected) ? placeholderHandler() : selectedOptions}
            {counter}
          </Flex>
        </Flex>

        <div className={"options-container"} ref={toggleOptionListRef}>
          <Flex vertical gap={24} align="center">
            {searchable && (
              <Flex vertical gap={24}>
                <Flex justify="between" align="center">
                  <div className="option-list-header-title">Categories</div>
                  <Button size="md" onClick={closeOptionList} variant="text">
                    X
                  </Button>
                </Flex>
                <Input
                  value={query.label}
                  onChange={onSearch}
                  name="query"
                  StartIcon={SearchIcon}
                  size={size}
                  borderRadius
                />
              </Flex>
            )}
            <Flex vertical gap={12} onClick={(e)=>console.log(e)}>
              {checkAllOption}
              {optionsList}
            </Flex>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export default Select;
