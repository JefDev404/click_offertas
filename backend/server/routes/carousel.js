import express from "express";
import { db } from "../../db.js";

const router = express.Router();

// 🔥 Carrossel da HOME
router.get("/carousel-home", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        imagem,
        preco,
        link
      FROM componentes_visual
      WHERE tipo = 'carousel'
      ORDER BY ordem ASC
      LIMIT 10
    `);

    res.json(rows);
  } catch (error) {
    console.error("Erro no carousel-home:", error);
    res.status(500).json({ error: "Erro ao buscar carrossel" });
  }
});

export default router;
