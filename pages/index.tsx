import PariBox from '@/components/PariBox';
import Planet from '@/components/Planet';
import PlanetLowilds from '@/components/PlanetLowilds';
import { useState } from 'react'
import { EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';

export default function Home() {
  const [userLevel, setUserLevel] = useState<Number>(1);
  return (
    <main className='flex relative justify-center items-center flex-col min-h-screen'>
      
      <Swiper
        effect={'coverflow'}
        spaceBetween={10}
        initialSlide={1}
        slidesPerView={3}
        centeredSlides={true}
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow]}
      >
        <SwiperSlide>
          <Planet planetLevel={"/models/green_planet.glb"} size={0.034} />
        </SwiperSlide>
        <SwiperSlide>
          <Planet planetLevel={"/models/purple_planet.glb"} size={5} />
        </SwiperSlide>
        <SwiperSlide>
          <Planet planetLevel={"/models/stylized_planet.glb"} size={6} />
        </SwiperSlide>
        <SwiperSlide>
          <PlanetLowilds planetLevel={"/models/lowilds_planet.glb"} size={1} />
        </SwiperSlide>
        <SwiperSlide>
          <Planet planetLevel={"/models/planet_earth.glb"} size={1} />
        </SwiperSlide>
      </Swiper>
    </main>
  )
}
