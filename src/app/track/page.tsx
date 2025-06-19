import React from 'react'
import { FiInbox } from 'react-icons/fi'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="bg-orange-50 p-6 rounded-full shadow-md mb-6">
        <FiInbox size={48} className="text-orange-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Nothing to show here</h2>
      <p className="text-gray-500 text-sm max-w-sm">
        Looks like there’s no content available right now. Please check back later!
      </p>
    </div>
  )
}

export default Page
