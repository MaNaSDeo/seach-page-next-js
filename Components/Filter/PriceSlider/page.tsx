import React, { useState, useRef, useEffect } from "react";
import styles from "./PriceSlider.module.scss";

interface PriceSliderProps {
  min: number;
  max: number;
  onChange: (minValue: number, maxValue: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ min, max, onChange }) => {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent, handle: "min" | "max") => {
    event.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const newPosition = (event.clientX - sliderRect.left) / sliderRect.width;
    const newValue = Math.round(newPosition * (max - min) + min);

    if (isDragging === "min") {
      setMinValue(Math.min(Math.max(newValue, min), maxValue - 1));
    } else {
      setMaxValue(Math.max(Math.min(newValue, max), minValue + 1));
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    onChange(minValue, maxValue);
  }, [minValue, maxValue, onChange]);

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={styles.priceSliderContainer}>
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.sliderTrack} />
        <div
          className={styles.sliderRange}
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />
        <div
          className={`${styles.sliderHandle} ${styles.sliderHandleMin}`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={(e) => handleMouseDown(e, "min")}
        />
        <div
          className={`${styles.sliderHandle} ${styles.sliderHandleMax}`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={(e) => handleMouseDown(e, "max")}
        />
      </div>
      <div className={styles.sliderValues}>
        <div className={styles.sliderLeftValue}>₹{minValue}</div>
        <div className={styles.sliderRightValue}>₹{maxValue}</div>
      </div>
    </div>
  );
};

export default PriceSlider;
