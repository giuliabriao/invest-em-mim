// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, A11y]);

import styles from "./styles.module.scss";

export function Slider() {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        style={{ width: "100%", flex: "1" }}
      >
        <SwiperSlide>
          <img src="/img/banner3.png" alt="pessoas reunidas falando de negocios" />
          <p> Negócios que cabem <br /> no seu bolso. </p>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/img/banner2.png" alt="Homem mexendo no smartphone" />
          <p> Tudo na palma da sua mão <br />e sem burocracias. </p>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/img/banner1.png" alt="Pessoas coletando lixo da praia voluntariamente" />
          <p> Invista, doe ou contribua <br /> com as suas causas favoritas. </p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
