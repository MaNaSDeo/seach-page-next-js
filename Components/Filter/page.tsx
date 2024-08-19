import style from "./Filter.module.scss";
import PriceSlider from "./PriceSlider/page";

function Filter() {
  const handlePriceChange = (min: number, max: number) => {
    console.log(`Price range: $${min} - $${max}`);
    // Do something with the new price range
  };

  return (
    <section className={style.container}>
      <div className={style.heading}>Filter</div>
      <div className="filterContainer">
        <div className="priceFilter">
          <h2>Price Range</h2>
          <PriceSlider min={0} max={1000} onChange={handlePriceChange} />
        </div>
      </div>
    </section>
  );
}

export default Filter;
