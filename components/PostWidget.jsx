import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services';
import {useState, useEffect} from 'react'

const PostWidget = ({categories, slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    if(slug){
      getSimilarPosts(categories, slug)
        .then((result) => setRelatedPosts(result));
    }else{
      getRecentPosts()
        .then((result) => setRelatedPosts(result))
    }
  }, [slug])
  
  return (
    <div className='bg-white p-6 shadow-lg rounded mb-6'>
      <h3 className='border-b font-semibold text-lg mb-4 pb-4'>
        { slug ? 'Related Posts' : 'Recent Posts' }
      </h3>
      {relatedPosts.map((post) => 
      ( 
        <div className='flex items-center w-full p-2'>
          <div className='w-16 flex-none'>
            <img
              height='60px'
              width='60px'
              className='rounded align-middle'
              src={post?.featuredImage?.url} 
              alt={post?.title}  
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-sm">{ moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link key={post.title} href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget