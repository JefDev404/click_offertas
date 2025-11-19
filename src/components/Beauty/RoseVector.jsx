// RoseVector.jsx
import React from "react";
import "./RoseVector.css";

export default function RoseVector() {
  return (
    <div className="vector-container">
      <img
        src="/imagesBeauty/rosas.webp"
        alt="Rosa Superior"
        className="rose top-right"
      />

      <img
        src="/imagesBeauty/rosas.webp"
        alt="Rosa Inferior"
        className="rose bottom-left"
      />
    </div>
  );
}
