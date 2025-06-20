/* eslint-disable @next/next/no-img-element */
'use client'
import { useCart } from '@/contexts/CartContext'
import Masonry from 'react-masonry-css'
import { BiCartAdd } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  brand: string
  description: string
  rating: number
  stock: number
}

type FeedItem = Product | { id: string; type: 'promo' | 'message' }

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return isMobile
}

const randomChips = [
  { label: '🔥 Hot', color: 'bg-red-600' },
  { label: '⭐ Top Rated', color: 'bg-yellow-500' },
  { label: '⚡ Sold Out', color: 'bg-gray-600' },
  { label: '💎 Premium', color: 'bg-purple-600' }
]

const DailyProducts = () => {
  const { addToCart } = useCart()
  const isMobile = useIsMobile()
  const [items, setItems] = useState<FeedItem[]>([])
  const [topPicks, setTopPicks] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const categories = [
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
  'home-decoration',
  'kitchen-accessories',
  'laptops',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'mobile-accessories',
  'motorcycle',
  'skin-care',
  'smartphones',
  'sports-accessories',
  'sunglasses',
  'tablets',
  'tops',
  'vehicle',
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches'
]


        const responses = await Promise.all(
          categories.map(cat =>
            fetch(`https://dummyjson.com/products/category/${cat}?limit=200`).then(res => res.json())
          )
        )

        let allProducts: Product[] = responses.flatMap(r => r.products)
        allProducts = allProducts.sort(() => 0.5 - Math.random()) // shuffle

        const picks = allProducts.slice(0, 5)
        const remaining = allProducts.slice(5)

        const mixedItems: FeedItem[] = [
          { id: 'promo1', type: 'promo' },
          ...remaining.slice(0, 40),
          { id: 'msg1', type: 'message' },
          ...remaining.slice(40)
        ]

        setTopPicks(picks)
        setItems(mixedItems)
      } catch {
        setError('Something went wrong while loading products.')
      }
    }

    fetchAll()
  }, [])

  const breakpointColumnsObj = {
    default: 5,
    1000: 4,
    600: 3,
    400: 2
  }

  const getRandomChip = () => {
    return Math.random() > 0.7 ? randomChips[Math.floor(Math.random() * randomChips.length)] : null
  }

  const renderProduct = (item: Product, isTopPick = false) => {
    const chip = isTopPick
      ? { label: 'Top Picks', color: 'bg-blue-600' }
      : getRandomChip()

    return (
      <div key={item.id} className='relative bg-gray-50/50 p-3 rounded-md text-center'>
        <Link href={`/product/${item.id}`}>
          <div className='cursor-pointer'>
            {chip && (
              <span className={`absolute top-2 left-2 px-2 py-1 text-xs text-white font-semibold rounded ${chip.color}`}>
                {chip.label}
              </span>
            )}
            <img src={item.thumbnail} className='h-40 w-full object-contain mb-2' alt={item.title} />
            <div className='flex flex-col text-left gap-1'>
              <h2 className='font-semibold text-gray-800 text-sm'>{item.title}</h2>
              <p className='text-gray-500 text-xs'>{item.brand}</p>
              <p className='text-gray-600 text-xs line-clamp-2'>{item.description}</p>
              <div className='flex justify-between items-center text-sm mt-1'>
                <p className='text-orange-500 font-bold'>${item.price}</p>
                <p className='text-green-600'>⭐ {item.rating}</p>
              </div>
            </div>
          </div>
        </Link>
        <div className='flex items-center justify-between mt-2'>
          <p className='text-blue-500 text-xs'>Stock: {item.stock}</p>
          <BiCartAdd
            onClick={() => addToCart(item)}
            className='text-orange-600 w-6 h-6 cursor-pointer hover:text-orange-800 transition duration-200'
          />
        </div>
      </div>
    )
  }

  const renderItems = () =>
    items.map(item => {
      if ('type' in item) {
        const chipStyle = item.type === 'promo' ? 'bg-green-600' : 'bg-red-600'
        const text = item.type === 'promo' ? '🔥 Promo' : '👀 Hot Pick'
        const msg = item.type === 'promo' ? 'Limited-time deal!' : 'People love this!'

        return (
          <div key={item.id} className='relative bg-white p-3 rounded-md text-center shadow'>
            <span className={`absolute top-2 left-2 px-2 py-1 text-xs text-white font-semibold rounded ${chipStyle}`}>
              {text}
            </span>
            <div className="h-20 flex items-center justify-center text-gray-500 text-sm">
              {msg}
            </div>
          </div>
        )
      }

      return renderProduct(item)
    })

  return (
    <div className='w-full pt-10'>
      <div className='w-[95%] lg:w-[85%] mx-auto'>
        {error && <p className='text-red-600 mb-4'>{error}</p>}

        {/* Top Picks Section */}
        <div className='mb-6'>
          <h2 className='md:text-xl font-semibold text-center mb-4'>Top Picks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topPicks.map(p => renderProduct(p, true))}
          </div>
        </div>

        {/* All Products Title */}
        <h2 className='lg:text-xl  text-center font-semibold mb-4'>All Products</h2>

        {isMobile ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'
          >
            {renderItems()}
          </Masonry>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {renderItems()}
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyProducts
