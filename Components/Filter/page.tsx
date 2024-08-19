"use client";

import style from "./Filter.module.scss";
import PriceSlider from "./PriceSlider/page";
import FilterGroup from "./CheckBox/Page";
import { useState } from "react";

interface FilterState {
  [key: string]: string[];
}

const filtersData = [
  {
    title: "VENDOR",
    options: [
      { id: "aderma", label: "Aderma" },
      { id: "aloelab", label: "Aloelab" },
      { id: "aromist_co", label: "Aromist Co" },
      // ... add more vendors
    ],
  },
  {
    title: "CATEGORY",
    options: [
      { id: "skincare", label: "Skincare" },
      { id: "haircare", label: "Haircare" },
      { id: "makeup", label: "Makeup" },
      // ... add more categories
    ],
  },
  {
    title: "PRICE RANGE",
    options: [
      { id: "under_50", label: "Under $50" },
      { id: "50_to_100", label: "$50 - $100" },
      { id: "over_100", label: "Over $100" },
      // ... add more price ranges
    ],
  },
];

function Filter() {
  const handlePriceChange = (min: number, max: number) => {
    console.log(`Price range: ₹${min} - ₹${max}`);
    // Do something with the new price range
  };
  const [filters, setFilters] = useState<FilterState>({});
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFilterChange = (
    filterType: string,
    selectedOptions: string[]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedOptions,
    }));
  };

  return (
    <section className={style.container}>
      <div className={style.heading}>Filter</div>
      <div className={style.filterContainer}>
        <div className={style.priceFilter}>
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
            <div className={style.filterTitle}>Price Range</div>
          </div>
          {isOpen && (
            <div className={style.filterContent}>
              <PriceSlider min={0} max={1000} onChange={handlePriceChange} />
            </div>
          )}
        </div>

        {filtersData.map((filter) => (
          <FilterGroup
            key={filter.title}
            title={filter.title}
            options={filter.options}
            onChange={handleFilterChange}
          />
        ))}
      </div>
    </section>
  );
}

export default Filter;
