/* eslint-disable @next/next/no-img-element */
'use client';

import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaShieldAlt, FaStripe, FaLock, FaPhoneAlt, FaEnvelope, FaSyncAlt, FaTruck, FaClock } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight, FiDelete, FiUser } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';
import Link from 'next/link';
import { BiCartAdd } from 'react-icons/bi';
import { BsBack } from 'react-icons/bs';

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
  stock: number;
  [key: string]: unknown;
}

const promoMessages = [
  '🔥 Big Summer Sale - Up to 50% Off!',
  '🎁 Invite Friends & Get 20% Discount!',
  '🚚 Free Shipping on Orders Over $50!',
];

const CartPage: React.FC = () => {
  const { data: session } = useSession();
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useCart();

  const [recommended, setRecommended] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [popOut, setPopOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const grandTotal = subtotal + shipping;

  const handlePopOut = () => {
    setPopOut(!popOut);
  };

  useEffect(() => {
    document.body.style.overflow = popOut ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % promoMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = await res.json();
        setAllProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!allProducts.length) return;

    const cartIds = new Set(cartItems.map((item) => item.id));
    const interests = new Set(cartItems.flatMap((item) => [item.category || '', item.brand || '']));

    const matched = allProducts.filter(
      (p) => !cartIds.has(p.id) && (interests.has(p.category) || interests.has(p.brand))
    );

    const extras = allProducts
      .filter((p) => !cartIds.has(p.id) && !matched.includes(p))
      .sort(() => 0.5 - Math.random())
      .slice(0, 20 - matched.length);

    setRecommended([...matched, ...extras].slice(0, 20));
  }, [allProducts, cartItems]);


  return (
    <>
      <div className='bg-gradient-to-r from-orange-600 to-pink-700 w-full p-2 flex justify-center items-center'>
        <p className='text-yellow-100 text-lg text-center font-semibold'>
          {promoMessages[currentMessageIndex]}
        </p>
      </div>
      <header className="py-4 shadow-xs ">
        <div className='bg-white w-[95%] xl:w-[85%] mx-auto flex items-center justify-between'>
          <div className='flex gap-10'>
            {/* Back Button */}
            <button onClick={() => window.history.back()} className="text-gray-600 text-lg hover:text-gray-800 transition">
              <FiArrowLeft />
            </button>

            {/* Cart Header */}
            <h1 className="text-xl font-bold flex items-center gap-2 text-gray-800">

              Cart
            </h1>

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


      <div className="mx-auto pt-6 lg:pt-12 pb-8 flex flex-col gap-28 w-[95%] xl:w-[85%] ">
        <div className='flex flex-col lg:flex-row lg:gap-14'>
          <div className="w-full">

            <div className=" flex flex-col lg:flex-row gap-2 lg:gap-12">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 mx-auto p-2 lg:p-8 w-3/4">
                  {/* Icon + Emoji for Visual Appeal */}
                  <div className="flex items-center gap-3 text-6xl text-gray-500">
                    <IoCartOutline className='text-orange-500 w-7 h-7 lg:h-8 lg:w-8' />
                  </div>

                  {/* Fun Empty Cart Message */}
                  <h2 className="lg:text-2xl text-xl font-semibold text-gray-700">Your cart is empty...</h2>
                  <p className="text-gray-600 text-sm text-center">Looks like you haven&#39;t added anything yet. Start shopping now!</p>

                  {/* Call-to-action Button */}
                  <Link
                    href="/"
                    className="bg-orange-500 text-white px-6 py-2 rounded-2xl w-fit flex gap-1.5 text-xs lg:text-sm font-semibold shadow-md hover:bg-orange-600 transition"
                  >
                    Explore Products <BsBack />
                  </Link>

                  {/* Shopping Tips for Extra Engagement */}
                  <div className="text-gray-600 text-xs mt-3 text-nowrap text-center">
                    <p>💡 Need help deciding? Check out our latest deals!</p>
                    <p>🚚 Free shipping on orders above $50!</p>
                  </div>
                </div>
              ) : (



                <div className="space-y-6">
                  <p className='text-lg font-bold'>Your Cart</p>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 border-t border-t-gray-200"
                    >
                      <div className="flex-shrink-0 bg-gray-100 p-3 rounded-md">
                        <img
                          src={typeof item.thumbnail === 'string' ? item.thumbnail : ''}
                          alt={item.title}
                          className="w-24 h-24 object-contain rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-semibold text-lg line-clamp-1">{item.title}</h2>
                        <p className="text-sm text-gray-600 font-medium">{typeof item.brand === 'string' ? item.brand : ''}</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{typeof item.description === 'string' ? item.description : ''}</p>
                        <p className="text-orange-600 font-bold text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          ${typeof item.price === "number" && typeof item.quantity === "number"
                            ? (item.price * item.quantity).toFixed(2)
                            : "0.00"}
                        </p>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                          }}
                          className="text-red-500 text-sm mt-1 hover:scale-105 transition"
                        >
                          <FiDelete />
                        </button>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => typeof item.cartId === 'number' && updateQuantity(item.cartId, item.quantity - 1)}
                            disabled={item.quantity === 1}
                            className="w-6 h-6 text-sm bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 transition"
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => typeof item.cartId === 'number' && updateQuantity(item.cartId, item.quantity + 1)}
                            className="w-6 h-6 text-sm bg-gray-200 rounded-full hover:bg-gray-300 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="w-full hidden lg:block lg:w-2/4 p-2 space-y-6 sticky top-20 border border-gray-50 self-start">

                <h2 className=" text-base font-bold text-orange-600">Order Summary</h2>

                <div className="flex justify-between text-gray-800">
                  <span className="font-medium text-gray-600 text-sm ">Subtotal:</span>
                  <span className="font-bold text-black text-sm ">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-800">
                  <span className="font-medium text-gray-600 text-sm ">Estimated Shipping:</span>
                  <span className="font-bold text-sm text-blue-600">${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-sm text-green-600">
                  <span>Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>

                {/* Payment Security Info */}
                <div className="mt-4 flex items-center gap-4 bg-gray-100 p-3 rounded-lg">
                  <FaShieldAlt className="text-orange-500 text-xl" />
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-sm ">Secure Checkout:</span> Payments are encrypted and processed via <span className="text-blue-600">Stripe</span>.
                  </p>
                </div>

                {/* Accepted Payment Methods */}
                <div className="mt-4 flex justify-center gap-8 text-gray-600 text-2xl">
                  <FaCcVisa className="text-blue-500" />
                  <FaCcMastercard className="text-red-500" />
                  <FaCcPaypal className="text-blue-600" />
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-orange-500 text-white text-center py-2 rounded-2xl hover:bg-orange-600 transition mt-4 text-sm lg:text-lg font-semibold"
                >
                  Proceed to Checkout
                </Link>

                {/* Trust & Security */}
                <div className="mt-4 text-gray-700 text-sm flex flex-col gap-2">
                  <p><FaStripe className="inline text-blue-600" /> <span className="font-medium">Powered by Stripe:</span> Secure payments.</p>
                  <p><FaLock className="inline text-green-500" /> <span className="font-medium text-black">SSL Encryption:</span> Your data is protected.</p>
                  <p><FaShieldAlt className="inline text-yellow-600" /> <span className="font-medium">Verified Payment Gateway:</span> Fully secure transactions.</p>
                </div>

                {/* Customer Support */}
                <div className="mt-4 bg-gray-100 p-3 rounded-lg flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">Customer Support</h3>
                  <p className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    <FaPhoneAlt className="text-blue-500" /> Need Help? Call: <span className="font-bold text-black">+1 800 123 456</span>
                  </p>
                  <p className="text-sm flex items-center gap-2 text-gray-700">
                    <FaEnvelope className="text-green-500" /> Email: <a href="mailto:support@yourstore.com" className="text-blue-500">support@yourstore.com</a>
                  </p>
                </div>

                {/* Extra Details */}
                <div className="mt-4 text-sm text-gray-800 flex flex-col gap-3">
                  <p><FaSyncAlt className="inline text-blue-600" /> <span className="font-semibold text-black">Easy Returns:</span> 30-day hassle-free refunds.</p>
                  <p><FaTruck className="inline text-green-500" /> <span className="font-semibold text-black">Fast Delivery:</span> Ships within 24 hours.</p>
                  <p><FaClock className="inline text-orange-500" /> <span className="font-semibold text-black">Order Processing:</span> Your order will be confirmed instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recommended Products Section */}
        {recommended.length > 0 && (
          <div className="mt-1">
            <h2 className="text-xl font-bold mb-4">You might also like</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
              {recommended.map(product => (
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
        )}
        <div className='fixed lg:hidden flex items-center bg-orange-500 text-white px-4 py-2 rounded-full top-[90%] right-4 gap-2 cursor-pointer hover:bg-orange-600 transition duration-200' onClick={handlePopOut}>
          <span className='text-sm'>Continue</span>  <FiArrowRight />
        </div>

        {popOut && (
          <div className='lg:hidden'>
            {/* Dark Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setPopOut(false)}
            ></div>

            {/* Sidebar Popout */}
            <div className="fixed top-0 right-0 h-full w-full ] bg-white shadow-lg px-4   py-10 overflow-y-auto z-50">
              <FiArrowLeft onClick={() => setPopOut(false)} />
              <h2 className="lg:text-xl text-base font-bold text-orange-600 mt-4">Order Summary</h2>

              <div className="flex justify-between text-gray-800 mt-4">
                <span className="font-medium text-gray-600 text-sm lg:text-lg">Subtotal:</span>
                <span className="font-bold text-black text-sm lg:text-lg">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-800 mt-2">
                <span className="font-medium text-gray-600 text-sm lg:text-lg">Estimated Shipping:</span>
                <span className="font-bold text-blue-600">${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg text-green-600 mt-4">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-orange-500 text-white text-center py-2 rounded-2xl hover:bg-orange-600 transition mt-4 text-sm lg:text-lg font-semibold"
              >
                Proceed to Checkout
              </Link>

              {/* Payment Security Info */}
              <div className="mt-4 flex items-center gap-4 bg-gray-100 p-3 rounded-lg">
                <FaShieldAlt className="text-orange-500 text-xl" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-sm lg:text-lg">Secure Checkout:</span> Payments are encrypted and processed via <span className="text-blue-600">Stripe</span>.
                </p>
              </div>

              {/* Accepted Payment Methods */}
              <div className="mt-4 flex justify-center gap-8 text-gray-600 text-2xl">
                <FaCcVisa className="text-blue-500" />
                <FaCcMastercard className="text-red-500" />
                <FaCcPaypal className="text-blue-600" />
              </div>

              {/* Trust & Security */}
              <div className="mt-4 text-gray-700 text-xs flex flex-col gap-2">
                <p className='flex gap-2 items-center'><FaStripe className="inline text-blue-600" />Powered by Stripe Secure payments.</p>
                <p className='flex gap-2 items-center'><FaLock className="inline text-green-500" /> SSL Encryption Your data is protected.</p>
                <p className='flex gap-2 items-center'><FaShieldAlt className="inline text-yellow-600" /> Verified Payment Gateway</p>
              </div>

              {/* Customer Support */}
              <div className="mt-4 bg-gray-100 p-3 rounded-lg flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800">Customer Support</h3>
                <p className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                  <FaPhoneAlt className="text-blue-500" /> Need Help? Call: <span className="font-bold text-black">+1 800 123 456</span>
                </p>
                <p className="text-sm flex items-center gap-2 text-gray-700">
                  <FaEnvelope className="text-green-500" /> Email: <a href="mailto:support@yourstore.com" className="text-blue-500">support@yourstore.com</a>
                </p>
              </div>

              {/* Extra Details */}
              <div className="mt-4 text-sm text-gray-800 flex flex-col gap-3 mb-8">
                <p><FaSyncAlt className="inline text-blue-600" /> <span className="font-semibold text-black">Easy Returns:</span> 30-day hassle-free refunds.</p>
                <p><FaTruck className="inline text-green-500" /> <span className="font-semibold text-black">Fast Delivery:</span> Ships within 24 hours.</p>
                <p><FaClock className="inline text-orange-500" /> <span className="font-semibold text-black">Order Processing:</span> Your order will be confirmed instantly.</p>
              </div>
            </div>
          </div>
        )}


      </div>
    </>
  );
};

export default CartPage;