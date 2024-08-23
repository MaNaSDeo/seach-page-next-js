"use client";

import style from "./Filter.module.scss";
import PriceSlider from "./PriceSlider/page";
import FilterGroup from "./CheckBox/Page";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { type IProduct, type FilterState } from "@/type";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

function Filter({ onFilterChange }: FilterProps) {
  const { items: data } = useAppSelector((state) => state.products);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 10000 },
  });
  const [overallPriceRange, setOverallPriceRange] = useState({
    min: 0,
    max: 10000,
  });
  const [filtersData, setFiltersData] = useState<
    Array<{ title: string; options: Array<{ id: string; label: string }> }>
  >([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (data.products.length > 0) {
      const newFiltersData = [
        {
          title: "RATING",
          options: [...new Set(data.products.map((p) => p.rating))].map(
            (rating) => ({
              id: `rating_${rating}`,
              label: `${rating} Stars`,
            })
          ),
        },
        {
          title: "DEPARTMENT",
          options: [...new Set(data.products.map((p) => p.department))].map(
            (dept) => ({
              id: dept,
              label: dept,
            })
          ),
        },
        {
          title: "PRODUCT",
          options: [...new Set(data.products.map((p) => p.product))].map(
            (prod) => ({
              id: prod,
              label: prod,
            })
          ),
        },
        {
          title: "PRODUCT ADJECTIVE",
          options: [
            ...new Set(data.products.map((p) => p.productAdjective)),
          ].map((adj) => ({
            id: adj,
            label: adj,
          })),
        },
        {
          title: "PRODUCT MATERIAL",
          options: [
            ...new Set(data.products.map((p) => p.productMaterial)),
          ].map((material) => ({
            id: material,
            label: material,
          })),
        },
        {
          title: "BRAND",
          options: [...new Set(data.products.map((p) => p.brand))].map(
            (brand) => ({
              id: brand,
              label: brand,
            })
          ),
        },
      ];

      setFiltersData(newFiltersData);

      const minPrice = Math.min(...data.products.map((p) => p.price));
      const maxPrice = Math.max(...data.products.map((p) => p.price));
      setOverallPriceRange({ min: minPrice, max: maxPrice });

      setFilters((prev) => ({
        ...prev,
        priceRange: { min: minPrice, max: maxPrice },
      }));
    }
  }, [data.products]);

  const handlePriceChange = (min: number, max: number) => {
    console.log(`Price range: ₹${min} - ₹${max}`);

    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
    onFilterChange({
      ...filters,
      priceRange: { min, max },
    });
  };

  const handleFilterChange = (
    filterType: string,
    selectedOptions: string | string[]
  ) => {
    const newSelectedOptions = Array.isArray(selectedOptions)
      ? selectedOptions
      : [selectedOptions];
    setFilters((prev) => ({
      ...prev,
      [filterType]: newSelectedOptions,
    }));
    onFilterChange({
      ...filters,
      [filterType]: newSelectedOptions,
    });
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
              <PriceSlider
                min={overallPriceRange.min}
                max={overallPriceRange.max}
                onChange={handlePriceChange}
              />
            </div>
          )}
        </div>

        {filtersData.map((filter) => (
          <FilterGroup
            key={filter.title}
            title={filter.title}
            options={filter.options}
            onChange={(selectedOptions) =>
              handleFilterChange(filter.title, selectedOptions)
            }
          />
        ))}
      </div>
    </section>
  );
}

export default Filter;
