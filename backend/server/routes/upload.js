// backend/routes/upload.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { db } from "../../db.js";

const router = express.Router();

// Obter __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pasta onde os arquivos serão salvos (uma pasta acima do server)
const uploadFolder = join(__dirname, "..", "uploads");

// Cria a pasta uploads se não existir
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `produto-${req.body.id}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// ============================
// Rota de upload de imagem
// ============================
router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID do produto é obrigatório" });

    if (!req.file) return res.status(400).json({ error: "Nenhuma imagem enviada" });

    const imagePath = `/uploads/${req.file.filename}`;

    // Atualiza a coluna imagem no banco
    const [result] = await db.query(
      "UPDATE produtos SET imagem = ? WHERE id = ?",
      [imagePath, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Produto não encontrado" });

    res.json({ message: "Imagem atualizada com sucesso!", imagem: imagePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao fazer upload", detalhes: err.message });
  }
});

export default router;
