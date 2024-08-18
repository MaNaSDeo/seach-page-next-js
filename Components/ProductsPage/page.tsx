import style from "./ProductsPage.module.scss";
import ProductCard from "../ProductCard/page";
import { type IProduct } from "@/type";

interface ProductsPageProps {
  products: Array<IProduct>;
}

function ProductsPage({ products }: ProductsPageProps) {
  return (
    <div className={style.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;
