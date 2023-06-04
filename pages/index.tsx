import Navbar from '@/components/Navbar';
import PariBox from '@/components/PariBox';
import Planet from '@/components/Planet';
import PlanetLowilds from '@/components/PlanetLowilds';
import AnimateBg from '@/animations/AnimateBg';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { EffectCoverflow } from 'swiper';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/swiper.min.css';

export default function Home() {
  const [userLevel, setUserLevel] = useState<Number>(1);
  const swiper = useSwiper();
  const { connected } = useWallet();
  const router = useRouter();

  // useEffect(() => {
  //   if (!connected) router.push("/login");
  //   console.log(swiper?.realIndex)
  // }, [connected, swiper])

  const handleChangueSlide = (e: SwiperClass) => {
    setUserLevel(e.activeIndex)
  }

  return (
    <main className='flex relative justify-center items-center flex-col min-h-screen'>
      <Navbar />
      <AnimateBg planetLevel={userLevel} />
      <Swiper
        onSlideChange={(e) => handleChangueSlide(e)}
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
          slideShadows: false
        }}
        modules={[EffectCoverflow]}
      >
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <Planet planetLevel={"/models/green_planet.glb"} size={0.034} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <Planet planetLevel={"/models/purple_planet.glb"} size={5} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <Planet planetLevel={"/models/stylized_planet.glb"} size={6} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <PlanetLowilds planetLevel={"/models/lowilds_planet.glb"} size={1} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <Planet planetLevel={"/models/planet_earth.glb"} size={1} isActive={isActive} />
            )
          }}
        </SwiperSlide>
      </Swiper>
    </main>
  )
}
