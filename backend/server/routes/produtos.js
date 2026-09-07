// backend/routes/produtos.js
import express from "express";
import { db } from "../../db.js";

const router = express.Router();

// ================= LISTAR PRODUTOS =================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// ================= CRIAR PRODUTO =================
router.post("/", async (req, res) => {
  try {
    const { categoria, nome, preco, imagem, link } = req.body;
    const [result] = await db.query(
      "INSERT INTO produtos (categoria, nome, preco, imagem, link) VALUES (?, ?, ?, ?, ?)",
      [categoria, nome, preco, imagem, link]
    );
    res.json({ id: result.insertId, categoria, nome, preco, imagem, link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// ================= EDITAR PRODUTO =================
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { categoria, nome, preco, imagem, link } = req.body;
  try {
    await db.query(
      "UPDATE produtos SET categoria=?, nome=?, preco=?, imagem=?, link=? WHERE id=?",
      [categoria, nome, preco, imagem, link, id]
    );
    res.json({ id, categoria, nome, preco, imagem, link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao editar produto" });
  }
});

// ================= EXCLUIR PRODUTO =================
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM produtos WHERE id=?", [id]);
    res.json({ message: "Produto excluído", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

export default router;
