"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchProducts } from "@/slices/productSlice";
import ProductsPage from "@/Components/ProductsPage/page";
import { IProduct } from "@/type";

function Home() {
  const dispatch = useAppDispatch();
  const {
    items: data,
    status,
    error,
  } = useAppSelector((state) => state.products);
  const [products, setProducts] = useState<IProduct[]>(data.products);

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

  if (status === "loading") return <div>Loading...</div>;

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <section style={{ width: "100vw", height: "100vh" }}>
      {products.length > 0 && <ProductsPage products={products} />}
    </section>
  );
}

export default Home;
