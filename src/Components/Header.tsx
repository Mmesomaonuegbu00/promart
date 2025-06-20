/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BiHeart } from 'react-icons/bi'
import { BsCartCheck } from 'react-icons/bs'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useCart } from '@/contexts/CartContext'
import Tags from './Tags'
import Cargo from './Products/Cargo'


const promoMessages = [
  '🔥 Big Summer Sale - Up to 50% Off!',
  '🎁 Invite Friends & Get 20% Discount!',
  '🚚 Free Shipping on Orders Over $50!',
]

const Header = () => {
  const [search, setSearch] = useState('')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const { cartItems } = useCart()
  const router = useRouter()

  const topTags = [
    'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty & Health', 'Sports & Outdoors',
    'Toys & Games', 'Automotive', 'Books', 'Grocery', 'Pet Supplies', 'Jewelry',
    'Baby Products', 'Office Supplies', 'Tools & Home Improvement', 'Computers & Accessories',
    'Arts & Crafts', 'Handmade', 'Music', 'Movies & TV'
  ]



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % promoMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchSuggestions = async (query: string) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
      const data = await res.json()
      setSuggestions(data.products || [])
    } catch (err) {
      console.error('Failed to fetch suggestions:', err)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (value.length > 1) {
      fetchSuggestions(value)
    } else {
      setSuggestions([])
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!search.trim()) return
    router.push(`/search?q=${search}`)
  }

  const { data: session } = useSession()
  const user = session?.user

  return (
    <>
      {/* Top Banner */}

      <div className='bg-gradient-to-r from-orange-600 to-pink-900 w-full p-2 flex justify-center items-center'>
        <p className='text-yellow-100 text-lg text-center font-semibold'>
          {promoMessages[currentMessageIndex]}
        </p>
      </div>

      <div>
        <Cargo />
      </div>


      {/* Main Header with Search */}
      <div className='w-full lg:p-2 bg-white p-1'>
        <div className='flex justify-between items-center w-[95%] lg:w-[85%] mx-auto gap-3'>

          <Link href="/">
            <p className="text-xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-600 to-pink-900 text-transparent bg-clip-text">
              ProMart
              <span className='font-light text-[10px] block -mt-2'>shop in one store</span>
            </p>
          </Link>

          {/* Search */}
          <div className='relative w-[150px] sm:w-[350px] lg:w-[400px]'>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder='Search for products'
                value={search}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                onChange={handleSearchChange}
                className='border border-gray-300 rounded-2xl p-2 h-7 lg:h-10 w-full outline-none focus:border-orange-500 transition-colors duration-200'
              />
            </form>

            {/* Chips */}
            {isFocused && search.length < 2 && (
              <div className='absolute top-full mt-2 w-full bg-white px-4 py-3 rounded shadow z-50'>
                <p className='text-sm font-medium mb-2'>Popular Searches</p>
                <div className='flex flex-wrap gap-2'>
                  {topTags.slice(0, 10).map((tag, i) => (
                    <span
                      key={i}
                      className='px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs cursor-pointer hover:bg-orange-200'
                      onClick={() => setSearch(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions dropdown */}
            {isFocused && search.length > 1 && (
              <div className='absolute top-full mt-2 w-full z-50 bg-white border border-gray-300 rounded shadow z-20 max-h-60 overflow-y-auto'>
                {suggestions.length === 0 ? (
                  <p className='text-sm p-2 text-gray-400'>No results found</p>
                ) : (
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      className='p-2 text-sm hover:bg-gray-100 cursor-pointer'
                      onClick={() => router.push(`/product/${item.id}`)}
                    >
                      {item.title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className='flex gap-2 lg:gap-6 items-center'>

            <Link href={user ? "/wishlist" : "/login"}>
              <BiHeart className='text-gray-500 w-5 h-5 lg:w-6 lg:h-6 cursor-pointer' />
            </Link>
            <Link href={user ? "/cart" : "/login"} className='relative'>
              <BsCartCheck className='text-gray-500 w-5 h-5 lg:w-6 lg:h-6 cursor-pointer' />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="">
        <Tags />
      </div>

    </>
  )
}

export default Header
