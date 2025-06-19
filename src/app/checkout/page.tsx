/* eslint-disable @next/next/no-img-element */
'use client'

import { useCart } from '@/contexts/CartContext'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaCcMastercard, FaCcPaypal, FaCcVisa, FaGooglePay } from 'react-icons/fa'
import { FiArrowLeft, FiUser } from 'react-icons/fi'

const promoMessages = [
    '🔥 Big Summer Sale - Up to 50% Off!',
    '🎁 Invite Friends & Get 20% Discount!',
    '🚚 Free Shipping on Orders Over $50!',
]

const Checkout = () => {
    const { cartItems, cartTotal } = useCart();
    const { data: session } = useSession()
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % promoMessages.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        postalCode: '',
        deliveryMethod: '',
        paymentMethod: '',
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvv: '',
    })

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('checkoutForm')
        if (saved) {
            setFormData(JSON.parse(saved))
        }
    }, [])

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('checkoutForm', JSON.stringify(formData))
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'radio' ? value : value,
        }))
    }


    return (
        <>
            <div className='bg-gradient-to-r from-orange-600 to-pink-700 w-full p-2 text-center'>
                <p className='text-yellow-100 font-semibold'>
                    {promoMessages[currentMessageIndex]}
                </p>
            </div>

            <header className='py-4 shadow-sm bg-white'>
                <div className='w-[95%] xl:w-[85%] mx-auto flex justify-between items-center'>
                    <div className='flex gap-6 items-center'>
                        <button onClick={() => window.history.back()} className='text-lg text-gray-600 hover:text-gray-800'>
                            <FiArrowLeft />
                        </button>
                        <h1 className='text-xl font-bold text-gray-800'>Checkout</h1>
                    </div>
                    <Link href='/profile'>
                        {session?.user?.image ? (
                            <img
                                src={session.user.image}
                                alt="avatar"
                                className="w-8 h-8 rounded-full border border-pink-300"
                            />
                        ) : (
                            <FiUser className="text-gray-600 text-2xl hover:text-gray-800 transition" />
                        )}</Link>
                </div>
            </header>

            <div className='w-[95%] xl:w-[85%] mx-auto pt-8 pb-16 flex flex-col md:flex-row gap-16'>
                <form className='flex flex-col gap-6 w-full'>
                    <div className='w-full md:w-5/6 flex flex-col gap-3'>
                        <h2 className='font-sans text-[16px] font-bold mt-3'>Contact Information</h2>
                        <div className='flex gap-4'>
                            <input name='firstName' type='text' required placeholder='First Name' className={input} value={formData.firstName} onChange={handleChange} />
                            <input name='lastName' type='text' required placeholder='Last Name' className={input} value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div className='flex gap-4'>
                            <input name='email' type='email' required placeholder='Email' className={input} value={formData.email} onChange={handleChange} />
                            <input name='phone' type='tel' required placeholder='Phone Number' className={input} value={formData.phone} onChange={handleChange} />
                        </div>

                        <h2 className='font-sans text-[16px] font-bold mt-3'>Delivery Method</h2>
                        {['Standard Delivery (3-6 days) FREE', 'Express Delivery (1-2 days) $10'].map((label, i) => (
                            <label
                                key={i}
                                className={`p-1.5 flex gap-2 items-center w-full border-[1px] border-gray-400 rounded-sm cursor-pointer ${formData.deliveryMethod === label ? 'ring-2 ring-orange-500' : ''
                                    }`}
                            >
                                <input
                                    type='radio'
                                    name='deliveryMethod'
                                    value={label}
                                    checked={formData.deliveryMethod === label}
                                    onChange={handleChange}
                                    className='accent-orange-500'
                                />
                                <p className='text-sm font-semibold font-sans'>{label}</p>
                            </label>
                        ))}

                        <h2 className='font-sans text-[16px] font-bold mt-3'>Shipping Information</h2>
                        <div className='flex gap-4'>
                            <input name='country' type='text' placeholder='Country' className={input} value={formData.country} onChange={handleChange} />
                            <input name='city' type='text' placeholder='City' className={input} value={formData.city} onChange={handleChange} />
                        </div>
                        <div className='flex gap-4'>
                            <input name='address' type='text' placeholder='Address' className={input} value={formData.address} onChange={handleChange} />
                            <input name='postalCode' type='text' placeholder='Postal code' className={input} value={formData.postalCode} onChange={handleChange} />
                        </div>

                        <h2 className='font-sans text-[16px] font-bold mt-3'>Payment Method</h2>
                        {[
                            { label: 'Visa', icon: <FaCcVisa className='text-blue-500' /> },
                            { label: 'Google Pay', icon: <FaGooglePay className='text-blue-500' /> },
                            { label: 'Mastercard', icon: <FaCcMastercard className='text-red-500' /> },
                            { label: 'PayPal', icon: <FaCcPaypal className='text-blue-600' /> },
                        ].map((method, i) => (
                            <label
                                key={i}
                                className={`p-1.5 flex justify-between items-center w-full border-[1px] border-gray-400 outline-none rounded-sm cursor-pointer ${formData.paymentMethod === method.label ? 'ring-2  outline-none ring-orange-500' : ''
                                    }`}
                            >
                                <div className='flex gap-2.5'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value={method.label}
                                        checked={formData.paymentMethod === method.label}
                                        onChange={handleChange}
                                        className='accent-orange-500 outline-none'
                                    />
                                    <p className='text-sm font-semibold font-sans'>{method.label}</p>
                                </div>
                                {method.icon}
                            </label>
                        ))}

                        {/* Optional card fields */}
                        <div className='flex gap-4'>
                            <input name='cardNumber' type='text' placeholder='Card Number' className={input} value={formData.cardNumber} onChange={handleChange} />
                            <input name='cardHolder' type='text' placeholder='Card Holder Full Name' className={input} value={formData.cardHolder} onChange={handleChange} />
                        </div>
                        <div className='flex gap-4'>
                            <input name='expiry' type='text' placeholder='Expiry date (MM/YY)' className={input} value={formData.expiry} onChange={handleChange} />
                            <input name='cvv' type='text' placeholder='CVV' className={input} value={formData.cvv} onChange={handleChange} />
                        </div>
                    </div>
                </form>
                <div className="w-full p-6 rounded-lg shadow-xs md:w-5/6">
                    <h3 className="text-[17px] font-bold mb-6 text-gray-800  pb-2">Order Summary</h3>



                    <div className="max-h-96 overflow-y-auto space-y-6 pb-6 mt-8 hide-scrollbar">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-6 items-center bg-orange-100/30 p-1.5 rounded-md shadow-sm">
                                    <img
                                        src={item.thumbnail as string}
                                        alt={item.title}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 rounded-md shadow-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                                        <p className="text-sm text-gray-600">{String(item.brand)}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-orange-600">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">Your cart is empty.</p>
                        )}
                    </div>

                    <div className="mt-6 space-y-4">
                        <p className="flex justify-between text-[15px]">
                            <span>Subtotal:</span> <span>${cartTotal.toFixed(2)}</span>
                        </p>
                        <p className="flex justify-between text-[15px] ">
                            <span>Shipping Method:</span> <span className="text-green-600">Standard Delivery (3-6 Days)</span>
                        </p>
                        <p className="flex justify-between text-[15px]">
                            <span>Estimated Tax:</span> <span>${(cartTotal * 0.08).toFixed(2)}</span>
                        </p>
                        <p className="flex justify-between text-[15px]">
                            <span>Discount Applied:</span> <span className="text-red-600">-$5.00</span>
                        </p>
                        <hr className="my-3" />
                        <p className="flex justify-between font-bold text-[15px]">
                            <span>Total:</span> <span>${(cartTotal * 1.08 - 5).toFixed(2)}</span>
                        </p>
                    </div>

                    {/* Estimated Delivery Date */}
                    <p className="text-sm text-gray-600 mt-3">
                        📦 Estimated delivery: <span className="font-semibold">June 20 - June 23</span>
                    </p>

                    {/* Discount Code Input */}
                    <div className="mt-6 flex gap-4 items-center">
                        <input type="text" placeholder="Enter discount code" className="p-3 border rounded-md w-full text-sm shadow-sm" />
                        <button className="bg-blue-600 text-white px-4 py-1 rounded-md font-semibold text-sm shadow-md">Apply</button>
                    </div>

                    {/* Place Order Button */}
                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-2xl text-lg mt-6  transition-all">
                        Place Order (${(cartTotal * 1.08 - 5).toFixed(2)})
                    </button>
                    {/* Purchased Items */}


                    {/* Pricing Breakdown */}

                </div>
            </div>
        </>
    )
}

export default Checkout

const input = 'p-1.5 w-full border-[1px] border-gray-400 rounded-sm'
