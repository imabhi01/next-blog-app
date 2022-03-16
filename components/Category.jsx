import React from 'react'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories));
  }, [])
  

  return (
    <div className='bg-white p-6 rounded shadow-lg mb-8 pb-12'>
      <h3 className='text-xl font-semibold border-b pb-4 mb-4'>Categories</h3>
      
      {categories.map((category) => (
        <div>
          <Link
            key={category.id} 
            href={`category/${category.slug}`}
            alt={category.name}
          >
            <span className='cursor-pointer block pb-3 mb-3 bg-gray-200 p-2 rounded-full text-center'>
              {category.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Category