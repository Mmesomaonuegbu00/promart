import React, { useRef } from "react";
import Link from "next/link";
import {
  MdOutlineSpa, MdChair, MdKitchen, MdWatch, MdOutlineSmartphone,
  MdOutlineSportsHandball, MdOutlineLocalGroceryStore, MdOutlineLaptopMac,
  MdOutlineDirectionsCar, MdOutlineShoppingBag, MdOutlineShoppingCart
} from "react-icons/md";
import {
  GiPerfumeBottle, GiHighHeel, GiLargeDress, GiSunglasses,
  GiClothesline, GiLipstick, GiTShirt, GiJewelCrown, GiMotorcycle
} from "react-icons/gi";
import { FaMotorcycle } from "react-icons/fa";

import { FaTabletAlt } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const categories = [
  { name: "Beauty", icon: <GiLipstick />, bgColor: "bg-orange-100", iconColor: "text-orange-600" },
  { name: "Fragrances", icon: <GiPerfumeBottle />, bgColor: "bg-amber-100", iconColor: "text-amber-600" },
  { name: "Furniture", icon: <MdChair />, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  { name: "Groceries", icon: <MdOutlineLocalGroceryStore />, bgColor: "bg-green-100", iconColor: "text-green-600" },
  { name: "Home Decoration", icon: <MdOutlineSpa />, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { name: "Kitchen Accessories", icon: <MdKitchen />, bgColor: "bg-lime-100", iconColor: "text-lime-600" },
  { name: "Laptops", icon: <MdOutlineLaptopMac />, bgColor: "bg-orange-100", iconColor: "text-orange-600" },
  { name: "Mens Shirts", icon: <GiClothesline />, bgColor: "bg-pink-100", iconColor: "text-pink-600" },
  { name: "Mens Shoes", icon: <GiHighHeel />, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { name: "Mens Watches", icon: <MdWatch />, bgColor: "bg-rose-100", iconColor: "text-rose-600" },
  { name: "Mobile Accessories", icon: <MdOutlineShoppingCart />, bgColor: "bg-green-100", iconColor: "text-green-600" },
  { name: "Motorcycle", icon: <FaMotorcycle />, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  { name: "Skin Care", icon: <MdOutlineSpa />, bgColor: "bg-indigo-100", iconColor: "text-indigo-600" },
  { name: "Smartphones", icon: <MdOutlineSmartphone />, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  { name: "Sports Accessories", icon: <MdOutlineSportsHandball />, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { name: "Sunglasses", icon: <GiSunglasses />, bgColor: "bg-amber-100", iconColor: "text-amber-600" },
  { name: "Tablets", icon: <FaTabletAlt />, bgColor: "bg-pink-100", iconColor: "text-pink-600" },
  { name: "Tops", icon: <GiTShirt />, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  { name: "Vehicle", icon: <MdOutlineDirectionsCar />, bgColor: "bg-lime-100", iconColor: "text-lime-600" },
  { name: "Womens Bags", icon: <MdOutlineShoppingBag />, bgColor: "bg-orange-100", iconColor: "text-orange-600" },
  { name: "Womens Dresses", icon: <GiLargeDress />, bgColor: "bg-pink-100", iconColor: "text-pink-600" },
  { name: "Womens Jewellery", icon: <GiJewelCrown />, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  { name: "Womens Shoes", icon: <GiHighHeel />, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { name: "Womens Watches", icon: <MdWatch />, bgColor: "bg-amber-100", iconColor: "text-amber-600" },
];


const HeroBottom = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="mx-auto py-6 px-2 relative lg:w-[85%]">
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-2xl font-semibold">Shop by Category</h2>
        <div className="flex gap-2">
          <button onClick={scrollLeft} className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition">
            <BsArrowLeft size={14} />
          </button>
          <button onClick={scrollRight} className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition">
            <BsArrowRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {categories.map((category) => (
          <Link
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            key={category.name}
          >
            <div
              className={`flex flex-col items-center justify-center gap-2 
    ${category.bgColor} p-4 rounded-lg 
    w-18 h-16 sm:w-28 sm:h-24 md:w-32 md:h-28`}
              style={{ scrollSnapAlign: "start" }}
            >

              <div className={`text-xl sm:text-2xl md:text-3xl ${category.iconColor}`}>
                {category.icon}
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 text-center">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroBottom;
