import express from "express";

import scrapAmazon from "../scrapers/amazon.js";
import scrapMercadoLivre from "../scrapers/mercadoLivre.js";
import shopeeApi from "../../api/shopeeApi.js";

const router = express.Router();

function detectarLoja(url) {
  if (url.includes("shopee.com")) return "shopee";
  if (url.includes("mercadolivre.com")) return "mercado_livre";
  if (url.includes("amazon.")) return "amazon";
  return null;
}

function extrairIdsShopee(url) {
  const match = url.match(/i\.(\d+)\.(\d+)/);
  if (!match) return null;
  return { shop_id: match[1], item_id: match[2] };
}

router.post("/", async (req, res) => {
  const { url } = req.body;
  const loja = detectarLoja(url);

  if (!loja) return res.json({ error: "Loja não suportada" });

  try {
    let result;

    if (loja === "shopee") {
      const ids = extrairIdsShopee(url);
      if (!ids) return res.json({ error: "URL Shopee inválida" });
      result = await shopeeApi(ids.shop_id, ids.item_id);
    }

    if (loja === "mercado_livre") result = await scrapMercadoLivre(url);
    if (loja === "amazon") result = await scrapAmazon(url);

    res.json(result);
  } catch (err) {
    res.json({ error: "Erro ao coletar produto", detalhes: err.message });
  }
});

export default router;

