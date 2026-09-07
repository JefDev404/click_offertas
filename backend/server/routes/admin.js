import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken"; // <- IMPORTA JWT

const router = express.Router();

// Chave secreta para JWT (coloque em .env na produção)
const JWT_SECRET = process.env.JWT_SECRET || "chave_super_secreta";

// Configuração do banco
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "erro404",       
  database: "clickoff"
});

// Rota POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuário inválido" });
    }

    const admin = rows[0];

    // valida a senha
    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // =========================
    // Aqui geramos o JWT
    // =========================
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "1h" } // token válido por 1 hora
    );

    // enviamos token pro frontend
    res.json({ success: true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
