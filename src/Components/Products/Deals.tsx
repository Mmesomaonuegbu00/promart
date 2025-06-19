/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'

const dealItems = [
    {
        image: '/c1.jpeg',
        messages: ['🔥 70% Off All Shoes!', 'Limited Sizes Left!', 'Shop Now While Last!'],
        description: 'Premium sneakers from top brands. Durable, stylish & comfy.',
        countdownMinutes: 73,
    },
    {
        image: '/c2.jpeg',
        messages: ['🎧 Flash Sale: Headphones', 'Noise-Cancelling Picks!', 'Only Today'],
        description: 'High-quality audio gear to fuel your playlist in style.',
        countdownMinutes: 58,
    },
    {
        image: '/c3.jpeg',
        messages: ['📱 Smartphones at 50% Off!', 'Latest Models Available', 'Grab Yours Now!'],
        description: 'Cutting-edge smartphones with unbeatable features.',
        countdownMinutes: 104,
    },
    {
        image: '/c4.jpeg',
        messages: ['🛋️ Furniture Sale - Up to 60% Off!', 'Transform Your Space', 'Limited Time Offer'],
        description: 'Stylish furniture to elevate your home decor.',
        countdownMinutes: 96,
    },
]

const Deals = () => {
    const [timeLeft, setTimeLeft] = useState<number[]>(
        dealItems.map((item) => item.countdownMinutes * 60)
    )
    const [messageIndexes, setMessageIndexes] = useState<number[]>(
        dealItems.map(() => 0)
    )

    // Countdown timer effect
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev.map((t) => (t > 0 ? t - 1 : 0)))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Message rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndexes((prev) =>
                prev.map((index, i) => (index + 1) % dealItems[i].messages.length)
            )
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return `${h.toString().padStart(2, '0')}:${m
            .toString()
            .padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    return (
        <div className="w-full pt-6 pb-16">
            <div className="w-[95%] lg:w-[85%] mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 xl:grid-cols-4 justify-center ">
                    {dealItems.map((item, i) => (
                        <div
                            key={i}
                            className="relative lg:w-[220px] xl:w-[360px] h-[100px] sm:h-[130px] xl:h-[160px] rounded-xl overflow-hidden shadow-xl bg-white"
                        >
                            <img
                                src={item.image}
                                alt={`Deal ${i + 1}`}
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white px-4">
                                <p className={`text-[14px] sm:text-lg md:text-xl font-bold text-center  animate-fade-${i}`}>
                                    {item.messages[messageIndexes[i]]}
                                </p>
                                <p className="text-sm mt-2 text-center hidden xl:block ">{item.description}</p>
                                <div className="mt-3 text-xs sm:text-xl font-bold bg-white/20 px-3 py-1 rounded-full text-orange-500">
                                    {formatTime(timeLeft[i])}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  ${dealItems
                    .map(
                        (_, i) => `
    .animate-fade-${i} {
      animation: fadeInOut 5s ease-in-out infinite;
    }
  `
                    )
                    .join('\n')}
`}</style>
        </div>
    )
}

export default Deals
