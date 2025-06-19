'use client'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { BiCartAdd } from 'react-icons/bi'

type Product = {
    _id: string
    title: string
    thumbnail: string
    price: number
    brand: string
    rating: number
    description: string
    stock: number
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    return (
        <div className="bg-white  rounded-lg overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer group">
            <div key={product._id} className='bg-gray-50 p-3 rounded-md text-center'>
                <Link href={`/product/${product._id}`}>
                    <div className='cursor-pointer'>
                        <img src={product.thumbnail} className='h-36 w-full object-contain mb-2' alt={product.title} />
                        <div className='flex flex-col text-left gap-1'>
                            <h2 className='font-semibold text-gray-800 text-sm'>{product.title}</h2>
                            <p className='text-gray-500 text-xs'>{product.brand ?? 'No brand'}</p>
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
                        onClick={() =>
                            addToCart({
                                ...product,
                                id: typeof product._id === 'string' ? parseInt(product._id, 10) || 0 : product._id,
                                brand: product.brand ?? 'No brand',
                                category: (product as { category?: string }).category ?? 'No category',
                            })
                        }
                        className='text-orange-600 w-6 h-6 cursor-pointer hover:text-orange-800 transition duration-200'
                    />

                </div>
            </div>
        </div>
    )
}

export default ProductCard
