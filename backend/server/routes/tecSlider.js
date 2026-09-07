import express from "express";
import { db } from "../../db.js";

const router = express.Router();

// ==============================
// SALVAR / ATUALIZAR SLIDER TEC
// ==============================
router.post("/", async (req, res) => {
  const { pagina, tipo, nome, preco, imagem, link, ordem } = req.body;

  if (!pagina || !tipo || !preco || !imagem || !link) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    await db.query(
      `DELETE FROM componentes_visual
       WHERE pagina = ? AND tipo = ? AND ordem = ?`,
      [pagina, tipo, ordem]
    );

    await db.query(
      `INSERT INTO componentes_visual
       (pagina, tipo, nome, preco, imagem, link, ordem)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [pagina, tipo, nome, preco, imagem, link, ordem]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Erro ao salvar sliderTec:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ==============================
// BUSCAR SLIDER TEC
// ==============================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT imagem, preco, link, ordem
       FROM componentes_visual
       WHERE pagina = 'tec'
         AND tipo = 'slider'
         AND ativo = 1
       ORDER BY ordem ASC
       LIMIT 10`
    );

    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar sliderTec:", err);
    res.status(500).json({ error: "Erro ao buscar slider" });
  }
});

export default router;
