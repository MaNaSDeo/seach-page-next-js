import Image from "next/image";

import style from "./ProductCard.module.scss";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    image: string;
    rating: number;
    reviews: number;
    department: string;
    product: string;
    productAdjective: string;
    productDescription: string;
    productMaterial: string;
    brand: string;
  };
}

function ProductCard() {
  const product = {
    id: "4a2823be-dd68-4242-a8ec-5f411d097702",
    name: "Small Satin Nightshirt",
    price: 1201.0,
    compareAtPrice: 1850.0,
    image: "https://loremflickr.com/480/640/sleepwear?lock=2936627053723648",
    rating: 5,
    reviews: 378,
    department: "Sleepwear",
    product: "Nightshirt",
    productAdjective: "Small",
    productDescription:
      "This small nightshirt is made of high-quality satin, perfect for sleepwear enthusiasts. The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    productMaterial: "Satin",
    brand: "Sinha - Bhat",
  };
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
