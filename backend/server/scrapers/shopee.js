import { chromium } from "playwright";

export default async function scrapShopee(url) {
  console.log("🔍 [DEBUG] Abrindo navegador...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("🌐 [DEBUG] Acessando URL:", url);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  // --- Espera o elemento de título aparecer ---
  try {
    await page.waitForSelector('div[class*="product-briefing"]', {
      timeout: 15000,
    });
  } catch (err) {
    console.log("⚠️ [DEBUG] Não encontrou a div principal do produto.");
  }

  // --- Tentando capturar o script __NEXT_DATA__ ---
  console.log("📦 [DEBUG] Tentando capturar __NEXT_DATA__...");
  const nextData = await page.evaluate(() => {
    const script = document.querySelector('script#__NEXT_DATA__');
    return script ? JSON.parse(script.textContent) : null;
  });

  if (!nextData) {
    console.log("❌ [DEBUG] Não encontrou __NEXT_DATA__. Tentando fallback...");

    // ---------- FALLBACK: Captura o JSON da variável global do Shopee ----------
    try {
      const fallback = await page.evaluate(() => {
        return window.__STORE__?.product || null;
      });

      if (fallback) {
        console.log("✅ [DEBUG] Fallback funcionou!");
        await browser.close();
        return fallback;
      }
    } catch (e) {
      console.log("⚠️ [DEBUG] Fallback falhou", e);
    }

    await browser.close();
    return { error: "__NEXT_DATA__ não encontrado" };
  }

  console.log("✅ [DEBUG] __NEXT_DATA__ capturado com sucesso!");

  const item = nextData.props?.pageProps?.item || null;

  await browser.close();

  if (!item) return { error: "Item não encontrado no JSON" };

  return {
    title: item.name,
    price: item.price_min / 100000,
    images: item.images?.map(img => "https://cf.shopee.com.br/file/" + img),
  };
}
