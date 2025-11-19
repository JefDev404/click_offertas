import React, { useState, useEffect } from "react";
import "./ModelSlider.css";

export default function ModelSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array de imagens local (igual ao products do ProdSlider)
  const images = [
    "/imagesBeauty/imgsmodels/modelo.webp",
    "/imagesBeauty/imgsmodels/model02.webp",
    "/imagesBeauty/imgsmodels/model03.webp",
    "/imagesBeauty/imgsmodels/model04.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideModelo">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Modelo ${index + 1}`}
          className={`slidemod ${index === currentIndex ? "active1" : ""}`}
        />
      ))}
    </div>
  );
}
