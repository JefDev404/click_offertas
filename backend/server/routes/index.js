import express from "express";

import produtosRoutes from "./produtos.js";
import uploadRoutes from "./upload.js";
import componentesDestaqRoutes from "./componentesDestaq.js";
import carouselRoutes from "./carousel.js";
import sliderBeautyRoutes from "./sliderBeauty.js";
import fitSliderRoutes from "./fitSlider.js";
import tecSliderRoutes from "./tecSlider.js";
import scrapRoutes from "./scrap.js";



import adminRoutes from "./admin.js";

const router = express.Router();

router.use("/produtos", produtosRoutes);
router.use("/uploads", uploadRoutes);
router.use("/destaques", componentesDestaqRoutes);
router.use("/carousel", carouselRoutes);
router.use("/sliderBeauty", sliderBeautyRoutes);
router.use("/sliderFit", fitSliderRoutes);
router.use("/tec-slider", tecSliderRoutes);
router.use("/scrap", scrapRoutes);


router.use("/admin", adminRoutes);

export default router;
