import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function shopeeApi(shop_id, item_id) {
  console.log("🔍 [ShopeeAPI] Extraindo IDs da URL...", shop_id, item_id);

  if (!shop_id || !item_id) {
    console.log("❌ [ShopeeAPI] ID inválido");
    return { error: "IDs inválidos" };
  }

  const partner_id = process.env.SHOPEE_PARTNER_ID;
  const partner_key = process.env.SHOPEE_PARTNER_KEY;
  const timestamp = Math.floor(Date.now() / 1000);

  // FAKE
  if (!partner_id || !partner_key) {
    return {
      title: "Shopee API – Chaves não configuradas",
      price: null,
      image: null,
      link: `https://shopee.com.br/product/${shop_id}/${item_id}`,
    };
  }

  // (Mais tarde colocaremos assinatura oficial aqui)
  return {
    title: "Shopee API configurada – pronto para ativar chaves oficiais",
    shop_id,
    item_id,
  };
}
