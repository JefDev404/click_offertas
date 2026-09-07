import axios from "axios";
import { load } from "cheerio";

export default async function scrapMercadoLivre(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    });

    const $ = load(html);

    // Título curto (primeiras 6 palavras)
    const titleFull = $("h1.ui-pdp-title").text().trim();
    const shortTitle = titleFull ? titleFull.split(" ").slice(0, 6).join(" ") : null;

    // Preço atual
    let price = null;
    const priceContainer = $("div.ui-pdp-price__second-line");
    if (priceContainer.length) {
      let inteiro = priceContainer.find("span.andes-money-amount__fraction").first().text().trim();
      let centavos = priceContainer.find("span.andes-money-amount__cents").first().text().trim() || "00";

      inteiro = inteiro.replace(/\./g, "");

      const parsedPrice = parseFloat(`${inteiro}.${centavos}`);
      if (!isNaN(parsedPrice)) price = parsedPrice;
    }

    // Imagem principal
    const image =
      $("img.ui-pdp-image.ui-pdp-gallery__figure__image").attr("src") ||
      $("img.ui-pdp-image.ui-pdp-gallery__figure__image").attr("data-src") ||
      null;

    return { title: shortTitle, price, image, link: url };
  } catch (err) {
    console.error("Erro Mercado Livre:", err.message);
    return { title: null, price: null, image: null, error: "Erro Mercado Livre" };
  }
}
