'use client'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-100 pt-10 px-6">
            <div className="w-[95%] lg:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
                {/* Logo & Description */}
                <div>
                    <Link href="/">
                        <p className="text-xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-600 to-pink-900 text-transparent bg-clip-text">
                            ProMart
                            <span className='font-light text-[10px] block -mt-2'>shop in one store</span>
                        </p>
                    </Link>
                    <p className="text-sm text-gray-400">
                        Your favorite place to shop for fashion, gadgets, and everything cool.
                    </p>
                </div>

                {/* About Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">About Us</h3>
                    <p className="text-sm text-gray-400">
                        We are dedicated to bringing you top-notch products with fast delivery and 24/7 support.
                        Quality is our promise.
                    </p>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                        <li>Email: <a href="mailto:mmesomaonurgbu9@gmail.com" className="text-orange-400 hover:underline">mmesomaonurgbu9@gmail.com</a></li>
                        <li>Phone: +234 81304 682 78</li>
                        <li>Location: Lagos, Nigeria</li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                        <li><a href="/products" className="hover:text-orange-400">Shop</a></li>
                        <li><a href="/cart" className="hover:text-orange-400">Cart</a></li>
                        <li><a href="/faq" className="hover:text-orange-400">FAQs</a></li>
                        <li><a href="/returns" className="hover:text-orange-400">Returns</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-6 text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Mutraka Store. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-orange-400"><FaFacebookF /></a>
                    <a href="#" className="hover:text-orange-400"><FaTwitter /></a>
                    <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
                    <a href="mailto:support@mutraka.com" className="hover:text-orange-400"><FaEnvelope /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
