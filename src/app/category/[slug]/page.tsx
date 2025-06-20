'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ProductCard from '@/Components/ProductCard'
import { categoryIcons } from '@/Components/caticons'
import { FaBox } from 'react-icons/fa'
import Loading from '@/app/loading'

type Category = {
  name: string
  slug: string
  url?: string
}

type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

const CategoryPage = () => {
  const { slug } = useParams() as { slug: string }
  const router = useRouter()

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/categories') // or directly use data if local
        const data: Category[] = await res.json()
        setCategories(data)
      } catch (err) {
        console.error('Failed to load categories:', err)
      }
    }

    fetchCategories()
  }, [])

  // Fetch products for selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${slug}`)
        const data = await res.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error('Failed to load products:', err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchProducts()
  }, [slug])

  const selectedCategory = categories.find(
    (cat) => cat.slug.toLowerCase() === slug?.toLowerCase()
  )

  if (categories.length === 0) {
    return <div className="p-6 text-gray-500"><Loading/></div>
  }

  if (!selectedCategory) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Category &quot;<span className="font-mono">{slug}</span>&quot; not found.
      </div>
    )
  }

  return (
    <div className="p-4 xl:p-6 flex flex-col xl:flex-row gap-6 w-full">
      {/* Mobile Toggle */}
      <div className="xl:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-orange-500 text-white text-[12px] px-3 py-1 rounded font-semibold"
        >
          {sidebarOpen ? 'Close Categories' : 'Browse Other Categories'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'flex' : 'hidden'
        } xl:flex flex-col gap-4 bg-gray-100 p-4 rounded-md w-full xl:w-1/6 h-fit transition-all duration-300`}
      >
        <h3 className="font-bold text-md mb-2">Shop by Category</h3>
        <ul className="flex flex-col gap-2 text-[15px] font-medium text-gray-900">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] || FaBox
            const isActive = cat.slug === slug

            return (
              <li
                key={cat.slug}
                onClick={() => {
                  setSidebarOpen(false)
                  router.push(`/category/${cat.slug}`)
                }}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition duration-200 
                  border-l-4 ${
                    isActive
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent hover:border-orange-400 hover:text-orange-500'
                  }`}
              >
                <span className="text-xl">
                  <Icon />
                </span>
                {cat.name}
              </li>
            )
          })}
        </ul>
      </aside>

      {/* Product Section */}
      <main className="flex-1 w-full">
        <h1 className="text-md font-bold mb-6 text-gray-800 ">
          Products in {selectedCategory.name}
        </h1>

        {loading ? (
          <div className="text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, _id: String(product.id) }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default CategoryPage