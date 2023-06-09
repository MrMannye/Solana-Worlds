import Navbar from '@/components/Navbar';
import Planet from '@/components/Planet';
import PlanetLowilds from '@/components/PlanetLowilds';
import AnimateBg from '@/animations/AnimateBg';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react'
import { EffectCoverflow } from 'swiper';
import { Swiper, SwiperClass, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/swiper.min.css';
import Animate from '@/animations/Animate';

export default function Home() {
  const [userLevel, setUserLevel] = useState<Number>(1);
  const swiper = useSwiper();
  const { connected } = useWallet();
  const router = useRouter();

  const { wallet, publicKey } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const [fetchLevel, setFetchLevel] = useState<Number>(1)

  useEffect(() => {
    if (connected) {
      fetch(`https://proactiveweek-superbrandon2018.b4a.run/users/${base58}`)
        .then(response => response.json())
        .then(data => {
          if (data.body === "USUARIO NUEVO"){
            setFetchLevel(1)
          }else{
            setFetchLevel(data.body[0].level);
            console.log(fetchLevel);
          }
        }).catch(e => {
          console.log(e)
        })
    }
  }, [connected])


  useEffect(() => {
    if (!connected) router.push("/login");
    console.log(swiper?.realIndex)
  }, [connected, swiper])


  const handleChangueSlide = (e: SwiperClass) => {
    setUserLevel(e.activeIndex)
  }

  return (
    <main className='flex relative justify-center items-center flex-col min-h-screen'>
      {/* <Transition/> */}
      <Animate>
        <Navbar />
      </Animate>
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
              <Planet planetLevel={"/models/green_planet.glb"} userLevel={fetchLevel} setUserLevel={setFetchLevel} level={userLevel} size={0.034} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <Planet planetLevel={"/models/purple_planet.glb"} userLevel={fetchLevel} setUserLevel={setFetchLevel} level={userLevel} size={5} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <Planet planetLevel={"/models/stylized_planet.glb"} userLevel={fetchLevel} setUserLevel={setFetchLevel} level={userLevel} size={6} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <PlanetLowilds planetLevel={"/models/lowilds_planet.glb"} userLevel={fetchLevel} setUserLevel={setFetchLevel} level={userLevel} size={1} isActive={isActive} />
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <Planet planetLevel={"/models/planet_earth.glb"} userLevel={fetchLevel} setUserLevel={setFetchLevel} level={userLevel} size={1} isActive={isActive} />
            )
          }}
        </SwiperSlide>
      </Swiper>
    </main>
  )
}
