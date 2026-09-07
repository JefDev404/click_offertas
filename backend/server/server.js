import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// arquivos estáticos
app.use("/uploads", express.static("uploads"));

// todas as rotas
app.use("/api", routes);

// 🔥 MUDANÇA AQUI: Usar a porta do ambiente ou 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta ${PORT}`);
});
