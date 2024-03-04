import React, { useRef, useState, useCallback, useEffect } from 'react';

import Input from '../Input';
import Checkbox from '../Checkbox';

import SearchIcon from '@/assets/icons/search_icon.svg';

import { classMapper, isEmpty, toggleCSSClass, toggleCSSClasses } from '@/utils/helper';

import useHandleClickOutSide from '@/hooks/useHandleClickOutSide';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import { OptionsType, SelectProps } from './types';

import './Select.scss';

const Select = ({
  Options,
  searchable = false,
  multiple = false,
  selectAllOption = false,
  values,
  setValues,
  onScroll,
  loading,
}: SelectProps) => {
  const selectedOptionsRef = useRef<HTMLElement>(null);
  const optionListRef = useRef<HTMLDivElement>(null);
  const inputToggleBtnRef = useRef<HTMLInputElement>(null);
  const toggleOptionListRef = useRef<HTMLDivElement | null>(null);
  const selectContainerRef = useRef<HTMLDivElement | null>(null);

  const [warpedCounter, setWarpedCounter] = useState<number>(0);
  const [query, setQuery] = useState({ label: '', value: '' });

  useHandleClickOutSide(selectContainerRef, () => {
    toggleCSSClass(toggleOptionListRef.current, 'open', 'remove');
    optionsListToggler(false);
  });

  const [targetRef, intersecting] = useIntersectionObserver({ threshold: 0, root: optionListRef.current });
  const optionsListToggler = (state: boolean) => {
    if (inputToggleBtnRef.current) inputToggleBtnRef.current.checked = state;
  };

  const selectHandler = (selectedValue: OptionsType) => {
    if (query) setQuery({ label: '', value: '' });
    if (multiple && Array.isArray(values)) {
      const alreadySelected = values.find((value) => value.id === selectedValue.id);
      if (alreadySelected) return setValues([...values.filter((val) => val.id !== selectedValue.id)]);
      setValues([...values, selectedValue]);
      return;
    }
    setValues(selectedValue);
    if (inputToggleBtnRef.current) toggleCSSClass(toggleOptionListRef.current, 'open', 'remove');
    optionsListToggler(false);
  };

  const checkAll = () => {
    if ((values as OptionsType[]).length != Options.length) return setValues(Options);
    setValues([]);
  };

  const removeSelectedOption = (id: string) => setValues((values as OptionsType[]).filter((value) => value.id != id));

  const toggleOptionsList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) return toggleCSSClass(toggleOptionListRef.current, 'open', 'add');
    toggleCSSClass(toggleOptionListRef.current, 'open', 'remove');
  };

  const handleFocusOnInput = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLDivElement;
    if (clickedElement.classList.contains('selected') || clickedElement.classList.contains('toggle-arrow-icon')) return;
    if (inputToggleBtnRef.current && !inputToggleBtnRef.current.checked) {
      toggleCSSClass(toggleOptionListRef.current, 'open', 'add');
      optionsListToggler(true);
      return;
    }
    if (inputToggleBtnRef.current && inputToggleBtnRef.current.checked) {
      optionsListToggler(false);
      toggleCSSClass(toggleOptionListRef.current, 'open', 'remove');
    }
  };

  const closeOptionList = () => {
    if (inputToggleBtnRef.current) toggleCSSClass(toggleOptionListRef.current, 'open', 'remove');
    optionsListToggler(false);
  };

  const onSearch = (e: any) => {
    if (!searchable) return e.preventDefault();
    setQuery({ label: e.target.value, value: e.target.value });
  };

  const reSizeHandler = useCallback(() => {
    if (selectedOptionsRef.current && selectContainerRef.current) {
      const selectedOptionsCollection = Array.from(selectedOptionsRef.current.children);
      const selectContainer = selectContainerRef.current?.getBoundingClientRect();
      const selectedOption = selectedOptionsCollection.filter((item) => !item.classList.contains('options-count'));
      const optionsInContainer = selectedOption?.filter((elm) => elm.getBoundingClientRect().right < selectContainer.right - 140);
      toggleCSSClasses(optionsInContainer, 'excessive-width', 'remove');
      const optionsOutContainer = selectedOption?.filter(
        (elm) => elm.getBoundingClientRect().right > selectContainer.right - 140,
      );
      toggleCSSClasses(optionsOutContainer, 'excessive-width', 'add');
      setWarpedCounter(document.getElementsByClassName('excessive-width').length);
    }
  }, [selectedOptionsRef]);

  useEffect(() => {
    if (multiple) {
      reSizeHandler();
      window.addEventListener('resize', reSizeHandler);
    }
    return () => {
      window.removeEventListener('resize', reSizeHandler);
    };
  }, [reSizeHandler, values]);

  useEffect(() => {
    onScroll?.(intersecting);
  }, [intersecting]);

  const selected = Array.isArray(values)
    ? values.flatMap((val) => Options.filter((item) => item.id === val.id))
    : Options.filter((item) => item.id === values.id)[0];

  const selectedClasses = classMapper('selected', {
    'first-selected-element': Array.isArray(selected) && selected.length == 1,
    'single-selected-element': !isEmpty(selected) && !multiple,
  });

  const selectedOptions = Array.isArray(selected) ? (
    selected.map((item, idx) => (
      <span className={selectedClasses} key={`${idx}${item?.label}`} onClick={() => removeSelectedOption(item.id)}>
        {item.label}
      </span>
    ))
  ) : (
    <span className={selectedClasses}>{selected?.label}</span>
  );

  const counter = warpedCounter ? <span className="options-count">{`${warpedCounter} More`}</span> : '';

  const queriedOptions = Options.filter((item) => item.label.toLowerCase().includes(query.label.toLowerCase()));

  const singleOptionsList = queriedOptions.map((opt, idx) => (
    <label className="options" htmlFor={opt?.id + idx} key={`${idx}${opt?.id}`} onClick={() => selectHandler(opt)}>
      {opt?.label}
    </label>
  ));

  const multipleOptionsList =
    multiple &&
    queriedOptions.map((opt, idx) => (
      <div className="options" key={`${idx}options`} ref={targetRef}>
        <Checkbox
          checked={(values as OptionsType[])?.some((value) => value.id === opt.id)}
          onChange={() => selectHandler(opt)}
          label={opt?.label}
          labelPosition="right"
          size="sm"
        />
      </div>
    ));

  const checkAllOption = selectAllOption && !query.label && (
    <div className="select-all-option">
      <Checkbox
        onChange={checkAll}
        checked={(values as OptionsType[]).length == Options.length}
        label="All"
        labelPosition="right"
        indeterminate={((values as OptionsType[]).length ? true : false) && (values as OptionsType[]).length !== Options.length}
        size="sm"
      />
    </div>
  );

  const optionsList = multiple ? multipleOptionsList : singleOptionsList;

  const placeholderClasses = classMapper('selected-placeholder', {
    'change-position-animation': !isEmpty(selectedOptions),
  });

  const optionListClasses = classMapper('options-list', { multiple: multiple, 'no-searchable': !searchable });

  return (
    <div className="select-container" ref={selectContainerRef}>
      <div className="selected-options" onClick={handleFocusOnInput}>
        <input type="checkbox" className="toggle-arrow-icon" onChange={toggleOptionsList} ref={inputToggleBtnRef} />
        <span ref={selectedOptionsRef} className="selected-options-list">
          {selectedOptions} {counter}
        </span>
        <span className={placeholderClasses}>{Array.isArray(selectedOptions) ? 'Categories' : 'Category'}</span>
      </div>

      <div className={'options-container'} ref={toggleOptionListRef}>
        <div className="options-container-content">
          {searchable && (
            <div className="options-container-content-header">
              <div className="option-list-header">
                <div className="option-list-header-title">Categories</div>
                <div className="option-list-header-closebtn" onClick={closeOptionList}></div>
              </div>
              <Input value={query.label} onChange={onSearch} name="query" startIcon={SearchIcon} size="sm" borderRadius />
            </div>
          )}

          <div className={optionListClasses} ref={optionListRef}>
            {/* <Loader loading={loading as boolean} /> */}
            {checkAllOption}
            {optionsList}
            {loading && <span style={{ display: 'inline-block', marginBottom: '10px', textAlign: 'center' }}>Loading...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
