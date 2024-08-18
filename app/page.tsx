import ProductCard from "@/Components/ProductCard/page";

function Home() {
  return (
    <div
      style={{
        display: "grid",
        // gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        padding: "1rem",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default Home;
