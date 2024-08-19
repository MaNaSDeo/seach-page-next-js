"use client";

import { type FC, useState } from "react";
import style from "./CheckBox.module.scss";

interface FilterOption {
  id: string;
  label: string;
}

interface CheckBoxProps {
  title: string;
  options: FilterOption[];
  onChange: (filterType: string, selectedOptions: string[]) => void;
}

const CheckBox: FC<CheckBoxProps> = ({ title, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (optionId: string) => {
    setSelectedOptions((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(optionId)) {
        newSelected = prevSelected.filter((id) => id !== optionId);
      } else {
        newSelected = [...prevSelected, optionId];
      }
      onChange(title.toLowerCase(), newSelected);
      return newSelected;
    });
  };

  const clearSelection = () => {
    setSelectedOptions([]);
    onChange(title.toLowerCase(), []);
  };

  return (
    <div className={style.filterCollapseContainer}>
      <div className={style.filterHeader} onClick={toggleOpen}>
        <div
          className={`${style.expandIcon} ${
            isOpen ? style.expandIconOpen : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgb(0, 0, 0)"
          >
            <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path>
          </svg>
        </div>
        <div className={style.filterTitle}>{title}</div>
      </div>
      {isOpen && (
        <div className={style.filterUncollapsed}>
          <div className={style.filterContent}>
            {selectedOptions.length > 0 && (
              <div className={style.showClear} onClick={clearSelection}>
                Clear
              </div>
            )}
            {options.map((option) => (
              <div key={option.id} className={style.filterCheckboxContainer}>
                <div>
                  <input
                    type="checkbox"
                    className={style.filterCheckbox}
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleCheckboxChange(option.id)}
                  />
                </div>
                <div className={style.filterCheckboxLabel}>{option.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckBox;
