import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./Carousel.css";

export default function Carousel() {
  const slides = [
    { img: "/imagens/produto1.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto2.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto3.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto4.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto5.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto3.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto3.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto3.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto3.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto3.webp", price: "R$ 99,90", link: "#" },
    { img: "/imagens/produto3.webp", price: "R$ 99,90", link: "#" },
  ];

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        spaceBetween={0}
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 1,
          modifier: 2,
          slideShadows: false,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        speed={2000}        
        breakpoints={{
          0: { slidesPerView: 1 },      // Celular
          768: { slidesPerView: 2 },    // Tablet
          1024: { slidesPerView: 3 },   // Desktop
        }}


      >
        {slides.map((s, i) => (
          <a href={s.link} target="_blank" rel="noopener noreferrer" className="slide-link">
            <SwiperSlide key={i} className="slide">
              <div className="slide-img">
                <img src={s.img} alt={`Produto ${i + 1}`} />
              </div>
              <p className="price">{s.price}</p>
            </SwiperSlide>

          </a>

        ))}
      </Swiper>
    </div>
  );
}
