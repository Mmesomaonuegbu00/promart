'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Category = {
  name: string;
  slug: string;
  url: string;
};

const Tags = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');

        const data = await res.json(); // Now expecting array of { slug, name, url }
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-gray-100 px-4 py-1 mt-2">
      <div className="flex overflow-x-auto gap-3 scrollbar-hide">
        {categories.length === 0 ? (
          <span className="text-sm text-gray-500">Loading tags...</span>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/category/${cat.slug}`)}
              className="whitespace-nowrap    text-sm text-gray-700 hover:border-orange-500 hover:text-orange-600 transition"
            >
              {cat.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Tags;