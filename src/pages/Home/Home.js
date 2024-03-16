import React from 'react'
import { HeroBanner } from '../../components/HeroBanner/HeroBanner'
import { ExploreCategories } from '../../components'
import { FeaturedProducts } from '../../components'
export const Home = () => {
  return (
    <div>
       <main className="main-wrapper">
      <HeroBanner />
      <ExploreCategories />
      <FeaturedProducts />
    </main>
    </div>
  )
}
