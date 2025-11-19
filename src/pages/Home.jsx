import React from "react";
import "./Home.css";
import Carousel from "../components/Carousel";
import fundo from "../assets/imgHome/fundokb.webp";
import ProductGrid from "../components/ProductGrid";
import produtosData from "../data/produtos.json";

export default function Home() {
  return (
    <main
      className="home"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="floating-elements-home">
        <h2 className="home-title">as melhores promoções em um só lugar</h2>
        <img src="/imagens/logo.png" className="featured-logo-home" alt="Logo" />
      </div>

      <Carousel />

      <section className="beauty-products-section">
        <ProductGrid produtos={produtosData} /> {/* 👉 Todos os produtos */}
      </section>
    </main>
  );
}
