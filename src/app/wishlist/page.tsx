'use client'

import Link from 'next/link'
import { FiHeart } from 'react-icons/fi'

const WishlistNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-6xl text-gray-400 mb-4">
        <FiHeart />
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h1>
      <p className="text-gray-500 mb-6">
        Looks like you haven&lsquo;t added any products yet.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition duration-200"
      >
        Start Shopping
      </Link>
    </div>
  )
}

export default WishlistNotFound
