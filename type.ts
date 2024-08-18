export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  department: string;
  product: string;
  productAdjective: string;
  productDescription: string;
  productMaterial: string;
  compareAtPrice: number;
}
export interface IProductResponse {
  products: IProduct[];
  brands: string[];
  NUMBER_OF_BRANDS: number;
  NUMBER_OF_PRODUCTS: number;
}

export interface IProductState {
  items: IProductResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
