/* eslint-disable @next/next/no-img-element */
'use client'

import { useCart } from '../../../contexts/CartContext'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiCartAdd } from 'react-icons/bi'
import { FaThumbsUp, FaThumbsDown, FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import Loading from '@/app/loading'

type Product = {
  meta: {
    createdAt: string
    updatedAt: string
    qrCode?: string
  }
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
  sku?: string
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
  minimumOrderQuantity?: number
  tags?: string[]
  reviews?: {
    rating: number
    comment: string
    date: string
    reviewerName: string
    avatarUrl?: string
    likes?: number
    dislikes?: number
  }[]
  dimensions?: {
    width: number
    height: number
    depth: number
  }
}

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null)
  const [recommended, setRecommended] = useState<Product[]>([])
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('description')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        if (!res.ok) throw new Error('Failed to fetch product')
        const data = await res.json()
        setProduct(data)
        setMainImage(data.images?.[0] || data.thumbnail)
      } catch {
        console.error('Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!product) return;

      try {
        // 1️⃣ Fetch similar products from the same category
        const categoryRes = await fetch(`https://dummyjson.com/products/category/${product.category}?limit=20`);
        const categoryData = await categoryRes.json();
        const similar = categoryData.products.filter((p: Product) => p.id !== product.id);

        // 2️⃣ If less than 20, fetch random extras
        let extras: Product[] = [];
        if (similar.length < 20) {
          const allRes = await fetch('https://dummyjson.com/products?limit=100');
          const allData = await allRes.json();
          const remaining = 20 - similar.length;

          // Filter out the current product and any already recommended
          const filtered = allData.products.filter(
            (p: Product) => p.id !== product.id && !similar.find((s: Product) => s.id === p.id)
          );

          

          // Shuffle and pick extras
          extras = filtered.sort(() => 0.5 - Math.random()).slice(0, remaining);
        }

        setRecommended([...similar, ...extras]);
      } catch (err) {
        console.error('Failed to fetch recommendations', err);
      }
    };

    fetchRecommendations();
  }, [product]);

  if (loading || !product) return <div className="p-4"><Loading/></div>

  // Calculate sold and soldPercentage for stock tracker
  const sold = (product.stock + 20) - product.stock;
  const soldPercentage = ((sold / (product.stock + 20)) * 100).toFixed(0);

  return (
    <div className='w-[95%] lg:w-[85%] flex flex-col mx-auto p-1 md:p-4 pt-14'>
      <div className='flex lg:flex-row flex-col gap-20 w-full'>
        {/* Side thumbnails */}
        <div className='flex gap-3 '>
          <div className='flex flex-col gap-2 max-w-[100px]'>
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`rounded-md p-2 border-2 cursor-pointer ${img === mainImage ? 'border-green-100 bg-green-50' : 'border-gray-100 bg-gray-50'
                  }`}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.title} thumbnail ${i + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              </div>

            ))}
          </div>

          {/* Main image */}
          <div className='bg-gray-100 rounded-md w-full max-w-2xl flex-1'>
            <img
              src={mainImage || product.thumbnail}
              alt={product.title}
              className='w-full object-cover mb-4 rounded'
            />
          </div>
        </div>
        {/* Product details */}

        <div className="flex flex-col gap-2 sm:text-sm  text-gray-800">

          {/* Brand & Title */}
          <div>
            <p className="text-gray-600 font-semibold">{product.brand}</p>
            <h1 className="text-xl lg:text-2xl font-bold">{product.title}</h1>
          </div>

          {/* Price & Rating */}
          <div className="flex gap-4 items-start border-b border-b-gray-300 pb-2">
            <div>
              <div className="text-lg sm:text-base font-bold text-green-600">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 line-through">
                ${((product.price * 100) / (100 - (product.discountPercentage ?? 0))).toFixed(2)}
              </div>
              <div className="text-green-600 text-xs font-semibold">
                {product.discountPercentage}% OFF
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-sm">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i + 1 <= Math.floor(product.rating);
                const half = i + 0.5 === product.rating;
                return (
                  <span key={i}>
                    {filled ? <FaStar className="text-yellow-400" />
                      : half ? <FaStarHalfAlt className="text-yellow-400" />
                        : <FaRegStar className="text-gray-300" />}
                  </span>
                );
              })}
              <span className="ml-1 text-gray-500">({product.rating})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-[15px]">{product.description}</p>

          {/* Basic Info */}
          
            <p><span className="font-semibold">SKU:</span> {product.sku}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <p className="col-span-2">
                <span className="font-semibold">Tags:</span> {product.tags.join(', ')}
              </p>
            )}
         

          {/* Dimensions */}
          <div className="bg-amber-100 p-3 rounded-md text-sm text-gray-700">
            <p><span className="font-semibold">Dimensions:</span> {product.dimensions?.width ?? 'N/A'}cm (W) × {product.dimensions?.height ?? 'N/A'}cm (H) × {product.dimensions?.depth ?? 'N/A'}cm (D)</p>
          </div>

          {/* Stock Tracker */}
          <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-600">
            <p>Stock: {product.stock} / {product.stock + 20} <span className="text-red-500">({sold} sold)</span></p>
            <div className="mt-1 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${soldPercentage}%` }}></div>
            </div>
            <p className="mt-1">
              <span className="font-semibold">Availability:</span> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          {/* Warranty & Shipping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p><span className="font-semibold">Warranty:</span> {product.warrantyInformation}</p>
            <p><span className="font-semibold">Shipping:</span> {product.shippingInformation}</p>
          </div>

          {/* Return & Order Info */}
          <div className="text-sm">
            <p className="text-red-500">
              <span className="font-semibold">Return Policy:</span> {product.returnPolicy}
            </p>
            <p>
              <span className="font-semibold">Minimum Order:</span> {product.minimumOrderQuantity}
            </p>
          </div>

          {/* Metadata */}
          <div className="text-xs text-gray-400">
            <p>Created: {new Date(product.meta.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(product.meta.updatedAt).toLocaleDateString()}</p>
          </div>

          {/* QR Code */}
          {product.meta?.qrCode && (
            <img src={product.meta.qrCode} alt="QR Code" className="w-24 h-24 mt-2 border rounded" />
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-2xl">
            <button
              onClick={() => addToCart(product)}
              className="bg-orange-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-orange-500 text-nowrap transition"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              className="border border-orange-500 text-orange-600 py-2 px-4 rounded-md flex items-center justify-center gap-2 text-nowrap hover:bg-orange-100 transition"
            >
              <FaHeart /> Add to Wishlist
            </button>
          </div>
        </div>

      </div>
      <div className="max-w-3xl w-full mt-20 h-full">
        {/* Tabs */}
        <div className="flex gap-4 pb-2">
          {["description", "reviews", "discussion"].map((tab) => (
            <button
              key={tab}
              className={`text-lg font-semibold ${activeTab === tab ? "border-b-2 orange-600 orange-600" : "text-gray-600"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="text-left">
          {/* Description */}
          {activeTab === "description" && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p className="text-gray-700 text-sm ">{product.description}</p>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div className="mt-4">
              <h2 className="text-xl font-bold flex gap-2">
                <span className="text-yellow-500">{(product.reviews ?? []).length}</span> Review
                {(product.reviews ?? []).length !== 1 ? "s" : ""}
              </h2>

              {!product.reviews || product.reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                product.reviews.map((review, i) => (
                  <div key={i} className="flex gap-3 p-4 mb-2 rounded border-t-[1px] border-gray-100 w-full">
                    <img
                      src={review.avatarUrl}
                      alt={review.reviewerName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">
                        {review.reviewerName} -{" "}
                        <span className="text-yellow-500">
                          {"⭐".repeat(review.rating)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                      <p className='text-sm'>{review.comment}</p>
                      <div className="flex gap-2 mt-1 text-gray-200 items-center">
                        <button className="hover:text-green-500"><FaThumbsUp /> {review.likes}</button>
                        <button className="hover:text-red-500"><FaThumbsDown /> {review.dislikes}</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Discussion (Placeholder) */}
          {activeTab === "discussion" && (
            <div className="mt-4">
              <p>Discussion section coming soon!</p>
            </div>
          )}
        </div>


      </div>
      {recommended.length > 0 && (
        <div className="mt-26">
          <h2 className="text-2xl font-bold mb-4">You might also like</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {recommended.map(product => (
              <div key={product.id} className='bg-gray-50 p-3 rounded-md text-center'>
                <Link href={`/product/${product.id}`}>
                  <div className='cursor-pointer'>
                    <img src={product.thumbnail} className='h-36 w-full object-contain mb-2' alt={product.title} />
                    <div className='flex flex-col text-left gap-1'>
                      <h2 className='font-semibold text-gray-800 text-sm'>{product.title}</h2>
                      <p className='text-gray-500 text-xs'>{product.brand}</p>
                      <p className='text-gray-600 text-xs line-clamp-2 font-semibold'>{product.description}</p>
                      <div className='flex justify-between items-center'>
                        <p className='text-orange-500 font-bold'>${product.price}</p>
                        <p className='text-green-600 text-sm'>⭐ {product.rating} / 5</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className='flex items-center justify-between mt-2'>
                  <p className='text-blue-500 text-sm'>Stock left: {product.stock}</p>
                  <BiCartAdd
                    onClick={() => {
                      addToCart(product)
                    }}
                    className='text-orange-600 w-6 h-6 cursor-pointer hover:text-orange-800 transition duration-200'
                  />


                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
