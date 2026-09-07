import axios from "axios";
import { load } from "cheerio";

export default async function scrapAmazon(url) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    });

    const $ = load(html);

    const titleFull = $("#productTitle").text().trim();
    const shortTitle = titleFull ? titleFull.split(" ").slice(0, 6).join(" ") : null;

    let priceFull = $("#corePrice_feature_div .a-offscreen").first().text().trim();
    if (!priceFull) priceFull = $(".a-price .a-offscreen").first().text().trim();

    if (priceFull) {
      priceFull = parseFloat(priceFull.replace("R$", "").replace(".", "").replace(",", "."));
    } else {
      priceFull = null;
    }

    const image =
      $("#imgTagWrapperId img").attr("src") ||
      $("#landingImage").attr("src") ||
      $("img[data-old-hires]").attr("data-old-hires") ||
      null;

    return { title: shortTitle, price: priceFull, image, link: url };
  } catch (err) {
    console.error("Erro Amazon:", err.message);
    return { title: null, price: null, image: null, error: "Erro Amazon" };
  }
}
