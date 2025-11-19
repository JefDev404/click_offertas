// ProdSlider.jsx
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./ProdSlider.css";

export default function ProdSlider() {
  const swiperRef = useRef(null);

  const products = [
    { img: "/imagesBeauty/imgslider/shop1.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagesBeauty/imgslider/shop2.webp", price: "R$ 89,90", link: "#" },
    { img: "/imagesBeauty/imgslider/shop1.webp", price: "R$ 79,90", link: "#" },
    { img: "/imagesBeauty/imgslider/shop2.webp", price: "R$ 119,90", link: "#" },
    { img: "/imagesBeauty/imgslider/shop1.webp", price: "R$ 59,90", link: "#" },
  ];

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;

    const handleTransitionEnd = () => {
      swiperInstance.slides.forEach((slide) => {
        const img = slide.querySelector("img");
        img.classList.remove("zoomed");
      });

      const activeSlideImg = swiperInstance.slides[swiperInstance.activeIndex].querySelector("img");
      activeSlideImg.classList.add("zoomed");
    };

    swiperInstance.on("slideChangeTransitionEnd", handleTransitionEnd);

    // Inicializar o zoom no slide inicial
    handleTransitionEnd();

    return () => {
      swiperInstance.off("slideChangeTransitionEnd", handleTransitionEnd);
    };
  }, []);

  return (
    <div className="beauty-vertical-container">
      <Swiper
        direction="vertical"
        modules={[Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        speed={1500}
        className="beauty-swiper"
        ref={swiperRef}
      >
        {products.map((p, index) => (
          <SwiperSlide key={index} className="beauty-slide">
            <a href={p.link} className="beauty-link">
              <div className="beauty-img-wrapper">
                <img src={p.img} alt="" />
              </div>
              <p className="beauty-price">{p.price}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
