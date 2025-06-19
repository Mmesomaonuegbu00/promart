'use client'

import React, { Suspense } from 'react'
import Hero from '@/Components/Hero/Hero'
import HeroBottom from '@/Components/Hero/HeroBottom'
import DailyProducts from '@/Components/Products/DailyProducts'
import Deals from '@/Components/Products/Deals'
import Loading from '@/app/loading' // adjust path if needed

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Hero />
        <HeroBottom />
        <Deals />
        <DailyProducts />
      </div>
    </Suspense>
  )
}

export default Home
