/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { categoryIcons } from '../caticons';
import { FaBox } from 'react-icons/fa';

type Category = {
    name: string;
    slug: string;
};

const Hero = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentImage, setCurrentImage] = useState(0);
    const router = useRouter();

    const heroImages = ['/bg2.png', '/bg3.png', '/bg4.png'];

    const featuredProducts = [
        { name: 'Nike Air Max', image: '/c1.jpeg', discount: '30% OFF' },
        { name: 'MacBook Pro', image: '/c4.jpeg', discount: '15% OFF' },
        { name: 'Smartwatch', image: '/c3.jpeg', discount: '25% OFF' },
    ];

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');

      const data: Category[] = await res.json(); // data is already in the correct shape
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  fetchCategories();
}, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div className='w-full'>
            <div className='w-full mx-auto flex gap-3 px-2 py-2'>
                {/* 👉 Category Sidebar */}
                <div className='hidden xl:flex flex-col gap-4 bg-gray-100 p-4 overflow-x-auto scrollbar-hide rounded-md w-1/6 h-[26rem] scrollbar-thin py-3'>
                    <h3 className='font-bold text-md mb-2'>Shop by Category</h3>
                    <ul className='flex flex-col gap-1.5 text-[15px]  text-gray-800'>
                        {categories.map((cat) => {
                            const Icon = categoryIcons[cat.slug] || FaBox;

                            return (
                                <li
                                    key={cat.slug}
                                    onClick={() => router.push(`/category/${cat.slug}`)}
                                    className='flex items-center gap-3 p-1 border-l-4 border-transparent hover:border-orange-500 hover:text-orange-600 transition duration-200 cursor-pointer'
                                >
                                    <span className='text-xl text-gray-600'>
                                        <Icon />
                                    </span>
                                    {cat.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <section className="relative w-full bg-gradient-to-br from-orange-600 to-pink-900 rounded-md lg:py-6 overflow-hidden h-[12rem] md:h-[15rem] lg:h-[26rem] xl:w-[90%]">


                    <div className="absolute top-12 right-10 bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md z-50">
                        🎁 Free Shipping!
                    </div>
                    <div className="absolute top-32 right-28 bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold hidden sm:block shadow-md z-50">
                        🕒 Limited Time Offer
                    </div>

                    <div className="relative z-10 flex flex-row items-center  px-2 lg:px-6 gap-10 w-[90%] ">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className='flex flex-col gap-2 h-full pt-8 text-left text-gray-100 max-w-[550px] z-10 px-4 lg:px-8'
                        >
                            <p className='text-[13px] lg:text-xl'>Welcome to Our Online Store</p>
                            <p className='text-black text-xl md:text-3xl lg:text-5xl font-bold'>20% OFF</p>
                            <p className='text-[13px] lg:text-lg line-clamp-1 lg:line-clamp-2'>
                                The key is to have every product you need at your fingertips. We strive to make your shopping experience as seamless as possible.
                            </p>
                            <p className='text-yellow-200 text-sm font-semibold line-clamp-1'>🔥 Limited-time deal! Hurry, before it’s gone!</p>
                            <button className='bg-black hover:bg-gray-800 text-[12px] md:text-base text-white px-4 md:px-6 py-2 rounded-md mt-auto w-fit transition-all duration-300'>
                                Shop Now
                            </button>
                        </motion.div>

                        <motion.img
                            key={currentImage}
                            src={heroImages[currentImage]}
                            alt="Hero"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="h-[10rem] lg:h-[28rem] absolute top-0 right-0 object-cover w-fit md:w-auto"
                        />
                    </div>

                    <motion.div
                        className="absolute hidden lg:block bottom-10 right-10 backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-lg shadow-lg w-72 text-center z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className="text-white text-sm font-semibold mb-2">⭐ Featured Deals</h4>
                        {featuredProducts.slice(0, 2).map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center justify-start gap-3 text-left mb-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.3 }}
                            >
                                <img src={item.image} alt={item.name} className="h-10 w-10 object-contain" />
                                <div>
                                    <p className="text-white text-xs font-medium">{item.name}</p>
                                    <p className="text-yellow-300 text-xs">{item.discount}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                <div className='hidden xl:flex flex-col w-1/3 gap-4'>
                    <div className='bg-gradient-to-br from-orange-700 to-yellow-700 h-[12.5rem] w-full p-2 rounded-md flex items-center justify-between overflow-hidden'>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-xl text-black font-bold'>Amazing Gadgets</p>
                            <span className='text-sm text-gray-100 hidden'>Easy to use • Rated 4.9/5 by gadget lovers!</span>
                            <span className='text-sm text-gray-100 font-semibold'>Revolutionize your tech game today!</span>
                            <span className='text-sm text-yellow-200 font-bold'>Limited-time offer: 20% off! Grab yours now.</span>
                            <button className='bg-white text-black text-sm px-3 w-fit py-1 rounded-md mt-auto transition hover:bg-gray-200'>
                                Shop Now
                            </button>
                        </div>
                        <img src='/l1.png' alt='Product 2' className='h-full object-cover rounded-md' />
                    </div>

                    <div className='bg-gradient-to-tl from-orange-700 to-amber-800 h-[12.5rem] w-full p-2 rounded-md flex items-center justify-between overflow-hidden'>
                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-xl text-black font-bold'>Amazing Gadgets</p>
                            <span className='text-sm text-gray-100 hidden'>Easy to use • Rated 4.9/5 by gadget lovers!</span>
                            <span className='text-sm text-gray-100 font-semibold'>Revolutionize your tech game today!</span>
                            <span className='text-sm text-yellow-200 font-bold'>Limited-time offer: 20% off! Grab yours now.</span>
                            <button className='bg-white text-black text-sm px-3 w-fit py-1 rounded-md mt-auto transition hover:bg-gray-200'>
                                Shop Now
                            </button>
                        </div>
                        <img src='/p1.png' alt='Product 2' className='h-full object-cover rounded-md' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero