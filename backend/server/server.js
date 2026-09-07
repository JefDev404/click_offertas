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

app.listen(3001, () =>
  console.log("API rodando na porta 3000")
);
