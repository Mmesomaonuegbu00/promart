import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center mt-16'>
      <Image src="spinner.svg" alt="Loading........"  width={100} height={100}/>
    </div>
  )
}
