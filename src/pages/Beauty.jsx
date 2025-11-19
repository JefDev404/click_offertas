import React from "react";
import "./Beauty.css";
import ProdSlider from "../components/Beauty/ProdSlider";
import ModelSlider from "../components/Beauty/ModelSlider";
import RoseVector from "../components/Beauty/RoseVector";
import ProductGrid from "../components/ProductGrid";
import produtosData from "../data/produtos.json";

export default function Beauty() {

  // 🔥 Filtra apenas os produtos da categoria “beauty”
  const produtosBeauty = produtosData.filter(
    (p) => p.categoria === "beauty"
  );

  return (
    <main
      className="beauty-page"
      style={{ backgroundImage: "url(/imagesBeauty/bkimg.webp)" }}
    >
      {/* LAYOUT COM 2 COLUNAS */}
      <section className="beauty-layout">

        {/* Lado esquerdo: SLIDER */}
        <div className="beauty-slider-section">
          <div className="slider-layer">
            <ProdSlider />
          </div>
          <div className="rose-layer">
            <RoseVector />
          </div>
        </div>

        {/* Lado direito: slider modelos + título + logo */}
        <div className="beauty-content-right">

          <div className="model-slider-section">
            <ModelSlider />
          </div>

          <div className="floating-elements">
            <h2 className="beauty-title">Beleza & Estilo</h2>
            <img src="/imagesBeauty/logo.png" className="featured-img" />
          </div>

        </div>

      </section>

      {/* GRID DE PRODUTOS DA CATEGORIA BEAUTY */}
      <section className="beauty-products-section">
        <ProductGrid produtos={produtosBeauty} />
      </section>

    </main>
  );
}
