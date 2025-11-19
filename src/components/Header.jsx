import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();

  // Define o tema e o título com base na rota
  let pageClass = "header-default";
  let pageTitle = "ClicK%OFFertas%";

  if (location.pathname === "/beauty") {
    pageClass = "header-beauty";
    pageTitle = "Beauty%OFFertas%";
  } else if (location.pathname === "/fit") {
    pageClass = "header-fit";
    pageTitle = "Fit%OFFertas%";
  } else if (location.pathname === "/tech") {
    pageClass = "header-tech";
    pageTitle = "Tech%OFFertas%";
  }

  return (
    <header className={`header ${pageClass}`}>
      <h1 className="logo">{pageTitle}</h1>

      <input
        type="text"
        placeholder="Pesquisar produtos..."
        className="search-bar"
      />

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/beauty">Beauty</Link>
        <Link to="/fit">Fit</Link>
        <Link to="/tech">Tech</Link>
      </nav>
    </header>
  );
}
