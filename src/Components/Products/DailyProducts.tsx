/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useCart } from '@/contexts/CartContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiCartAdd } from 'react-icons/bi'

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

const CategorySection = ({ title, category }: { title: string, category: string }) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=10`)
                if (!res.ok) throw new Error(`Failed to fetch ${title}`)
                const data = await res.json()
                setProducts(data.products)
            } catch (err: any) {
                setError(err.message)
            }
        }

        fetchCategory()
    }, [category, title])

    return (
        <div className='mb-10'>
            <div className='flex items-center gap-2 mb-4'>
                <span className='relative bg-gray-900 text-white px-4 py-2 text-sm before:absolute before:top-0 before:right-0 before:w-4 before:h-full before:bg-gray-900 before:-skew-x-12'>
                    {title}
                </span>
                <div className='flex-1 h-px bg-gray-300' />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {error && <p className='text-red-500'>{error}</p>}
                {products.map(product => (
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
    )
}

const DailyProducts = () => {
    const { data: session } = useSession();
    return (
        <div className='w-full pt-10'>
            <div className='w-[95%] lg:w-[85%] mx-auto'>
                <CategorySection title='Clothes' category='womens-dresses' />
                <CategorySection title='Accessories' category='fragrances' />
                <CategorySection title='Gadgets' category='smartphones' />
                <div className="bg-yellow-600 h-20 md:h-32 w-full mb-10 flex items-center gap-1 justify-between lg:px-24 xl:px-26 overflow-hidden relative">
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-sm px-3 py-1 rounded-br-lg z-50">20% OFF</div>
                    <div className="overflow-auto relative">
                        <Image src="/p2.png" alt="Left Image" width={300} height={300} className="object-cover rounded-full" />
                    </div>
                    <div className="flex flex-col items-center text-white text-center relative">
                        {session ? (
                            <div className="mt-2 text-lg">
                                <p className='head text-xs md:text-lg'>Welcome, {session.user?.name}!</p>
                                <p className='hidden sm:block'>Enjoy exclusive deals and special offers.</p>
                                <p className='text-red-500 text-sm md:text-lg text-nowrap'>Limited-time promotions just for you.</p>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="promoMessage"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5 }}
                                        className="hidden sm:block text-3xl font-bold"
                                    >
                                        Get your discount now!
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="guestMessage"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-2xl font-bold"
                                >
                                    Sign in to access exclusive deals!
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                    <div className="overflow-auto relative">
                        <Image src="/p3.png" alt="Right Image" width={300} height={300} className="object-cover rounded-full" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-20 rounded-full"></div>
                        <div className="absolute bottom-10 left-10 w-20 h-20 bg-black opacity-10 rounded-full"></div>
                    </div>
                </div>

                <CategorySection title='Groceries' category='groceries' />
                <CategorySection title='Skincare' category='beauty' />
                <CategorySection title='Home Decor' category='home-decoration' />
                <CategorySection title='Laptops' category='laptops' />
                <CategorySection title='Mens Shirts' category='mens-shirts' />
                <CategorySection title='Shoes' category='mens-shoes' />
                <CategorySection title='Sunglasses' category='sunglasses' />
            </div>

        </div>
    )
}

export default DailyProducts
