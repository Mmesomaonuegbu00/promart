/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import {
  FiUser,
  FiLogOut,
  FiEdit,
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
} from 'react-icons/fi'
import { useSession, signOut } from 'next-auth/react'

const ProfilePage = () => {
  const { data: session } = useSession()
  const [data, setData] = useState<any | null>(null)
  const [cart, setCart] = useState<never[]>([])
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('checkoutForm')
    if (saved) setData(JSON.parse(saved))
    const cartData = localStorage.getItem('cartItems')
    if (cartData) setCart(JSON.parse(cartData))
  }, [])

  const name = session?.user?.name || `${data?.firstName || ''} ${data?.lastName || ''}`
  const email = session?.user?.email || data?.email
  const avatar =
    session?.user?.image ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`

  if (!session && !data) {
    return (
      <div className="w-[85%] mx-auto h-[70vh] flex items-center justify-center text-gray-500 font-medium">
        No profile info available. Please log in and complete checkout details.
      </div>
    )
  }

  return (
    <div className="w-[85%] mx-auto min-h-screen py-8 space-y-6">
      {/* Header */}
      <div className="flex md:flex-row flex-col md:items-center gap-4">
        <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-orange-500" />
        <div>
          <h2 className="font-semibold text-lg text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
        <div className="md:ml-auto flex gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-4 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
          >
            <FiEdit className="inline mr-1" /> Edit Profile
          </button>
          <button
            onClick={() => signOut()}
            className="px-4 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            <FiLogOut className="inline mr-1" /> Sign Out
          </button>
        </div>
      </div>

      {/* Profile Info Box */}
      <SectionBox icon={<FiUser />} title="Profile Info">
        <p className="text-sm text-gray-700 mb-2">Phone: {data?.phone}</p>
        <p className="text-sm text-gray-700 mb-2">
          Address: {data?.address}, {data?.city}, {data?.country} - {data?.postalCode}
        </p>
        <p className="text-sm text-gray-700 mb-2">Delivery: {data?.deliveryMethod}</p>
        <p className="text-sm text-gray-700 mb-2">Payment: {data?.paymentMethod}</p>
      </SectionBox>

      {/* Orders */}
      <SectionBox icon={<FiShoppingBag />} title="My Orders">
        <p className="text-sm text-gray-500">(Orders section coming soon...)</p>
      </SectionBox>

      {/* Saved Cards */}
      <SectionBox icon={<FiCreditCard />} title="Saved Cards">
        {data?.cardNumber ? (
          <p className="text-sm text-gray-700">
            Card: **** {data.cardNumber.slice(-4)}<br />
            Holder: {data.cardHolder}<br />
            Expires: {data.expiry}
          </p>
        ) : (
          <p className="text-sm text-gray-500">No saved card info.</p>
        )}
      </SectionBox>

      {/* Shipping Info */}
      <SectionBox icon={<FiTruck />} title="Shipping Info">
        <p className="text-sm text-gray-700">
          {data?.address}, {data?.city}, {data?.country} - {data?.postalCode}
        </p>
      </SectionBox>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg relative shadow-xl">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <input
                type="text"
                defaultValue={data?.firstName}
                placeholder="First Name"
                className="w-full bg-orange-50 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                defaultValue={data?.lastName}
                placeholder="Last Name"
                className="w-full bg-orange-50 rounded px-3 py-2 text-sm"
              />
              <input
                type="tel"
                defaultValue={data?.phone}
                placeholder="Phone"
                className="w-full bg-orange-50 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                defaultValue={data?.address}
                placeholder="Address"
                className="w-full bg-orange-50 rounded px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm font-medium"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const SectionBox = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-lg ">
    <h3 className="text-orange-500 font-semibold mb-3 flex items-center gap-2 text-sm">
      {icon} {title}
    </h3>
    {children}
  </div>
)

export default ProfilePage
