'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// --- Types ---
interface Product {
  id: number
  title: string
  price: number
  [key: string]: unknown // Accepts other product fields too
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  cartTotal: number
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
}

// --- Context ---
const CartContext = createContext<CartContextType | undefined>(undefined)

// --- Provider ---
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored)
        const validItems = parsed.filter(
          item =>
            typeof item.id === 'number' &&
            typeof item.title === 'string' &&
            typeof item.price === 'number' &&
            typeof item.quantity === 'number'
        )
        setCartItems(validItems)
      }
    } catch (error) {
      console.error('Invalid cart data in localStorage:', error)
      localStorage.removeItem('cart')
    }
  }, [])

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev // skip duplicates
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

// --- Hook ---
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
