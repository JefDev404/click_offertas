import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();
  const path = location.pathname;

  // Estilo base
  let footerStyle = {
    backgroundColor: "#111",
    color: "#fff",
    padding: "15px",
    textAlign: "center",
  };

  let footerText = "© 2025 CLICK %OFFertas% - Todos os direitos reservados";

  // Personaliza conforme a rota
  if (path === "/beauty") {
    footerStyle = { ...footerStyle, backgroundColor: "#ffb6c1", color: "#3a003a" };
    footerText = "© 2025 Beauty %OFFertas% 💅 - Todos os direitos reservados";
  } else if (path === "/fit") {
    footerStyle = { ...footerStyle, backgroundColor: "#008000", color: "#fff" };
    footerText = "© 2025 Fit %OFFertas% 💪 - Todos os direitos reservados";
  } else if (path === "/tech") {
    footerStyle = { ...footerStyle, backgroundColor: "#001f3f", color: "#0ff" };
    footerText = "© 2025 Tech %OFFertas% 💻 - Todos os direitos reservados";
  }

  return (
    <footer style={footerStyle}>
      <p>{footerText}</p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        Voltar ao topo ↑
      </button>
    </footer>
  );
}
