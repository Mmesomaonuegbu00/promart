/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import { useCart } from '@/contexts/CartContext'

interface Product {
    id: number
    title: string
    price: number
    description: string
    thumbnail: string
}

const GiftSpinner = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null)
    const [isSpinning, setIsSpinning] = useState(false)
    const [claimed, setClaimed] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
    const [translateRadius, setTranslateRadius] = useState(120)

    const { addToCart } = useCart()

    const fetchGifts = async () => {
        const categories = ['fragrances', 'groceries', 'home-decoration']
        let all: Product[] = []

        for (const cat of categories) {
            const res = await fetch(`https://dummyjson.com/products/category/${cat}`)
            const data = await res.json()
            all = [...all, ...data.products.slice(0, 2)]
        }

        setProducts(all)
    }

    useEffect(() => {
        fetchGifts()
    }, [])

    const handleSpin = () => {
        if (isSpinning) return

        setClaimed(false)
        setSelectedGiftId(null)
       setIsSpinning(true)

setTimeout(() => {
  const selected = products[Math.floor(Math.random() * products.length)]
  setSelectedGiftId(selected.id)
  setIsSpinning(false)
  setShowOverlay(true) // 👈 Only show overlay *after* spinning
}, 4000)

    }
    useEffect(() => {
        const updateTranslateRadius = () => {
            const width = window.innerWidth

            if (width < 400) setTranslateRadius(100)
            else if (width < 640) setTranslateRadius(100)
            else if (width < 768) setTranslateRadius(120)
            else setTranslateRadius(120)
        }

        updateTranslateRadius()
        window.addEventListener('resize', updateTranslateRadius)
        return () => window.removeEventListener('resize', updateTranslateRadius)
    }, [])


    const handleClaim = () => {
        const selected = products.find(p => p.id === selectedGiftId)
        if (!selected) return
        addToCart({ ...selected, price: 0 })
        setClaimed(true)
    }

    const sortedProducts = [...products].sort((a, b) => {
        if (a.id === selectedGiftId) return -1
        if (b.id === selectedGiftId) return 1
        return 0
    })

    return (
        <div className="min-h-screen w-full  py-10 px-4 flex flex-col items-center gap-6">
            <h2 className="text-lg font-bold text-orange-600">Spin & Win</h2>

            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
                <div
                    className={`absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-orange-500 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-pink-500 ${isSpinning ? 'animate-spin-slow' : ''
                        }`}
                >
                    {products.map((product, index) => {
                        const angle = (360 / products.length) * index
                        return (
                            <div
                                key={product.id}
                                className="absolute w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-md"
                                style={{
                                    transform: `rotate(${angle}deg) translate(${translateRadius}px) rotate(-${angle}deg)`
                                }}

                            >
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Spin Button */}
                <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-orange-600 px-5 py-3 rounded-full font-semibold shadow-lg z-10 hover:bg-orange-600 hover:text-white transition-all"
                >
                    {isSpinning ? 'Spinning...' : 'SPIN 🎡'}
                </button>
            </div>


            <p className="text-gray-600 text-sm max-w-md text-center">
                Spin the wheel to win a random product for free! The gift will be added to your cart.
            </p>

            {/* Overlay */}
            {showOverlay && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
                    {!claimed ? (
                        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md text-center">
                            {selectedGiftId &&
                                <>
                                    <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 You Got a Gift!</h2>
                                    {products
                                        .filter(item => item.id === selectedGiftId)
                                        .map(gift => (
                                            <div key={gift.id}>
                                                <img
                                                    src={gift.thumbnail}
                                                    alt={gift.title}
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                />
                                                <h3 className="text-lg font-semibold">{gift.title}</h3>
                                                <p className="text-sm text-gray-500 mb-2">{gift.description}</p>
                                                <button
                                                    onClick={handleClaim}
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold shadow mt-4"
                                                >
                                                    ✅ Claim Gift (Add to Cart)
                                                </button>
                                                <button
                                                    onClick={() => setShowOverlay(false)}
                                                    className="mt-3 text-sm text-gray-500 hover:text-red-500"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        ))}
                                </>
                            
                                
                            }
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-6 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-bold text-orange-600 mb-4">🎁 Your Gift</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {sortedProducts.map(product => (
                                    <div
                                        key={product.id}
                                        className={`rounded-lg border p-3 transition-all shadow ${product.id === selectedGiftId
                                            ? 'border-green-500 bg-green-50'
                                            : 'opacity-50 cursor-not-allowed'
                                            }`}
                                    >
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-full h-20 object-cover rounded mb-2"
                                        />
                                        <h3 className="text-sm font-semibold">{product.title}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                                        <p
                                            className={`mt-2 text-center text-xs py-1 rounded font-medium ${product.id === selectedGiftId
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-300 text-gray-600'
                                                }`}
                                        >
                                            {product.id === selectedGiftId ? '₦0 (Claimed)' : 'Locked'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setShowOverlay(false)}
                                    className="text-sm text-gray-500 hover:text-red-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default GiftSpinner
