// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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
          <img src="/img/asia.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/asia.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/asia.png" alt="" />
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
}
