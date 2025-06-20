"use client"

import { signIn } from "next-auth/react"
import { CgGoogle } from "react-icons/cg"
import { FiShoppingCart } from "react-icons/fi"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-orange-50/50 rounded-xl shadow-xs px-6 py-10 space-y-6 text-center">
        {/* Logo Section */}
        <div className="flex justify-center items-center gap-2 text-orange-600 text-2xl font-extrabold">
          <FiShoppingCart />
           <p className="text-xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-600 to-pink-900 text-transparent bg-clip-text">
              ProMart
              <span className='font-light text-[10px] block -mt-2'>shop in one store</span>
            </p>
        </div>

        <h2 className="text-lg font-semibold text-gray-800">Welcome!</h2>
        <p className="text-sm text-gray-600">Sign in to continue your shopping</p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-full bg-orange-600 border-none p-2 rounded-lg text-gray-100 hover:bg-orange-100 transition"
        >
          <CgGoogle size={20} />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
