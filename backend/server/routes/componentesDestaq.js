import express from "express";
import { db } from "../../db.js";


const router = express.Router();

/**
 * SALVAR componente de destaque
 */
router.post("/", async (req, res) => {
  try {
    const { pagina, tipo, nome, preco, imagem, link, ordem } = req.body;

    if (!pagina || !tipo || !imagem) {
      return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
    }

    await db.query(
      `INSERT INTO componentes_visual
       (pagina, tipo, nome, preco, imagem, link, ordem, ativo)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [pagina, tipo, nome, preco, imagem, link, ordem]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Erro ao salvar destaque:", err);
    res.status(500).json({ erro: "Erro ao salvar destaque" });
  }
});

/**
 * BUSCAR componentes de destaque
 * /api/destaques?pagina=home&tipo=carousel
 */
router.get("/", async (req, res) => {
  try {
    const { pagina, tipo } = req.query;

    const [rows] = await db.query(
      `SELECT * FROM componentes_visual
       WHERE pagina = ? AND tipo = ? AND ativo = 1
       ORDER BY ordem ASC`,
      [pagina, tipo]
    );

    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar destaques:", err);
    res.status(500).json({ erro: "Erro ao buscar destaques" });
  }
});

export default router;

