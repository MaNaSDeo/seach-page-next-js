"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchProducts } from "@/slices/productSlice";
import style from "./Main.module.scss";
import ProductsPage from "@/Components/ProductsPage/page";
import NavBar from "@/Components/NavBar/page";
import Filter from "@/Components/Filter/page";
import { type IProduct, type FilterState } from "@/type";

function Home() {
  const dispatch = useAppDispatch();
  const {
    items: data,
    status,
    error,
  } = useAppSelector((state) => state.products);
  const [products, setProducts] = useState<IProduct[]>(data.products);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 10000 },
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (data.products) {
      setProducts(data.products);
    }
  }, [data.products]);

  const applyFilters = (filters: FilterState) => {
    let filteredProducts = data.products;

    // if (filters.priceRange) {
    //   filteredProducts = filteredProducts.filter(
    //     (p) =>
    //       p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    //   );
    // }

    Object.entries(filters).forEach(([key, value]) => {
      if (key === "priceRange") {
        const { min, max } = value as { min: number; max: number };
        filteredProducts = filteredProducts.filter(
          (p) => p.price >= min && p.price <= max
        );
      } else if (Array.isArray(value) && value.length > 0) {
        filteredProducts = filteredProducts.filter((p) => {
          if (key === "RATING") {
            return value.includes(`rating_${p.rating}`);
          }
          return value.includes(
            p[key.toLowerCase() as keyof IProduct] as string
          );
        });
      }
    });

    setProducts(filteredProducts);
  };

  const handleFilterChange = (
    newFilters: FilterState & { priceRange: { min: number; max: number } }
  ) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <section className={style.container}>
      <NavBar />
      {products.length > 0 && (
        <div className={style.filterNProducts}>
          <Filter onFilterChange={handleFilterChange} />
          <ProductsPage products={products} />
        </div>
      )}
    </section>
  );
}

export default Home;
