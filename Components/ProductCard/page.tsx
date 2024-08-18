import Image from "next/image";
import style from "./ProductCard.module.scss";
import { type IProduct } from "@/type";

interface ProductCardProps {
  product: IProduct;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={style.productCard}>
      <div className={style.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          width={480}
          height={640}
          layout="responsive"
          objectFit="cover"
        />
      </div>

      <div className={style.productDescription}>
        <p className={style.title}>{product.name}</p>
        <p className={style.description}>{product.productDescription}</p>
        <div className={style.priceSection}>
          <p className={style.price}>₹{product.price}</p>
          {product.compareAtPrice > product.price && (
            <p className={style.compareAtPrice}>₹{product.compareAtPrice}</p>
          )}
        </div>
      </div>
      <button type="button" className={style.atcBtn}>
        ADD TO CART
      </button>
    </div>
  );
}

export default ProductCard;
