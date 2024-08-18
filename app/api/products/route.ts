import { NextResponse } from "next/server";
import { fakerEN_IN as faker } from "@faker-js/faker";

const NUMBER_OF_BRANDS = Number(process.env.NUMBER_OF_BRANDS) || 5;
const NUMBER_OF_PRODUCTS = Number(process.env.NUMBER_OF_PRODUCTS) || 24;

// Types
interface Product {
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

interface TrendingProduct {
  id: string;
  name: string;
  image: string;
}

const categories = [
  {
    department: "Tops",
    products: [
      "T-shirt",
      "Blouse",
      "Tank Top",
      "Crop Top",
      "Sweater",
      "Cardigan",
      "Hoodie",
      "Polo Shirt",
      "Turtleneck",
    ],
    materials: [
      "Cotton",
      "Linen",
      "Silk",
      "Polyester",
      "Wool",
      "Cashmere",
      "Modal",
      "Viscose",
      "Rayon",
    ],
    imageKeyword: "tops",
  },
  {
    department: "Bottoms",
    products: [
      "Jeans",
      "Trousers",
      "Shorts",
      "Skirt",
      "Leggings",
      "Chinos",
      "Cargo Pants",
      "Culottes",
      "Palazzo Pants",
    ],
    materials: [
      "Denim",
      "Cotton",
      "Linen",
      "Polyester",
      "Leather",
      "Corduroy",
      "Velvet",
      "Spandex",
      "Twill",
    ],
    imageKeyword: "bottoms",
  },
  {
    department: "Dresses",
    products: [
      "Maxi Dress",
      "Mini Dress",
      "Midi Dress",
      "Sundress",
      "Cocktail Dress",
      "Wrap Dress",
      "Shift Dress",
      "Bodycon Dress",
      "A-line Dress",
    ],
    materials: [
      "Silk",
      "Chiffon",
      "Cotton",
      "Lace",
      "Satin",
      "Jersey",
      "Crepe",
      "Velvet",
      "Tulle",
    ],
    imageKeyword: "dresses",
  },
  {
    department: "Outerwear",
    products: [
      "Jacket",
      "Coat",
      "Blazer",
      "Parka",
      "Windbreaker",
      "Trench Coat",
      "Puffer Jacket",
      "Denim Jacket",
      "Leather Jacket",
    ],
    materials: [
      "Wool",
      "Leather",
      "Polyester",
      "Down",
      "Cotton",
      "Nylon",
      "Fleece",
      "Denim",
      "Suede",
    ],
    imageKeyword: "outerwear",
  },
  {
    department: "Activewear",
    products: [
      "Sports Bra",
      "Yoga Pants",
      "Running Shorts",
      "Tank Top",
      "Compression Shirt",
      "Track Jacket",
      "Sweatpants",
      "Cycling Shorts",
      "Swimsuit",
    ],
    materials: [
      "Spandex",
      "Nylon",
      "Polyester",
      "Lycra",
      "Mesh",
      "Bamboo",
      "Merino Wool",
      "Elastane",
      "Microfiber",
    ],
    imageKeyword: "activewear",
  },
  {
    department: "Underwear",
    products: [
      "Bra",
      "Panties",
      "Boxers",
      "Briefs",
      "Thong",
      "Camisole",
      "Slip",
      "Shapewear",
      "Lingerie Set",
    ],
    materials: [
      "Cotton",
      "Silk",
      "Lace",
      "Microfiber",
      "Nylon",
      "Spandex",
      "Modal",
      "Satin",
      "Bamboo",
    ],
    imageKeyword: "underwear",
  },
  {
    department: "Accessories",
    products: [
      "Scarf",
      "Hat",
      "Gloves",
      "Belt",
      "Tie",
      "Socks",
      "Sunglasses",
      "Watch",
      "Jewelry",
    ],
    materials: [
      "Leather",
      "Silk",
      "Wool",
      "Cotton",
      "Metal",
      "Plastic",
      "Glass",
      "Rubber",
      "Fabric",
    ],
    imageKeyword: "fashion accessories",
  },
  {
    department: "Footwear",
    products: [
      "Sneakers",
      "Boots",
      "Sandals",
      "Heels",
      "Flats",
      "Loafers",
      "Oxfords",
      "Slippers",
      "Espadrilles",
    ],
    materials: [
      "Leather",
      "Canvas",
      "Suede",
      "Rubber",
      "Mesh",
      "Synthetic",
      "Patent Leather",
      "Cork",
      "Velvet",
    ],
    imageKeyword: "shoes",
  },
  {
    department: "Sleepwear",
    products: [
      "Pajamas",
      "Nightgown",
      "Robe",
      "Sleep Shirt",
      "Lounge Pants",
      "Nightshirt",
      "Onesie",
      "Sleep Mask",
      "Slippers",
    ],
    materials: [
      "Cotton",
      "Silk",
      "Flannel",
      "Modal",
      "Satin",
      "Fleece",
      "Bamboo",
      "Microfiber",
      "Jersey",
    ],
    imageKeyword: "sleepwear",
  },
  {
    department: "Swimwear",
    products: [
      "Bikini",
      "One-piece Swimsuit",
      "Swim Trunks",
      "Board Shorts",
      "Tankini",
      "Rash Guard",
      "Swim Skirt",
      "Cover-up",
      "Wetsuit",
    ],
    materials: [
      "Nylon",
      "Spandex",
      "Polyester",
      "Lycra",
      "Neoprene",
      "Microfiber",
      "Chlorine-resistant fabric",
      "Quick-dry fabric",
      "UV-protective fabric",
    ],
    imageKeyword: "swimwear",
  },
];

// Helper functions
function generateBrandNames(count: number): string[] {
  return Array.from({ length: count }, () => faker.company.name());
}

function getProductDetails(brandName: string): Product {
  const category = faker.helpers.arrayElement(categories);
  const product = faker.helpers.arrayElement(category.products);
  const material = faker.helpers.arrayElement(category.materials);

  const adjective = faker.commerce.productAdjective();
  const name = `${adjective} ${material} ${product}`;

  return {
    id: faker.string.uuid(),
    name: name,
    price: Number(faker.commerce.price({ min: 100, max: 3000 })),
    compareAtPrice: Number(faker.commerce.price({ min: 100, max: 3000 })),
    image: faker.image.urlLoremFlickr({
      width: 480,
      height: 640,
      category: category.imageKeyword,
    }),
    rating: faker.number.int({ min: 1, max: 5 }),
    reviews: faker.number.int({ min: 50, max: 1500 }),
    department: category.department,
    product: product,
    productAdjective: adjective,
    productDescription: `This ${adjective.toLowerCase()} ${product.toLowerCase()} is made of high-quality ${material.toLowerCase()}, perfect for ${category.department.toLowerCase()} enthusiasts. ${faker.commerce.productDescription()}`,
    productMaterial: material,
    brand: brandName,
  };
}

function generateProductData(count: number, brands: string[]): Product[] {
  return Array.from({ length: count }, (_, index) =>
    getProductDetails(brands[index % brands.length])
  );
}

export async function GET(request: Request) {
  try {
    const brands = generateBrandNames(NUMBER_OF_BRANDS);
    const products = generateProductData(NUMBER_OF_PRODUCTS, brands);

    return NextResponse.json({
      products,
      brands,
      NUMBER_OF_BRANDS,
      NUMBER_OF_PRODUCTS,
    });
  } catch (error) {
    console.error("Error in /api/products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
