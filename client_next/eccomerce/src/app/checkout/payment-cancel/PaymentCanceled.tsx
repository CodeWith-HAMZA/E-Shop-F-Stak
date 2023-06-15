import Link from 'next/link'
import React from 'react'

const PaymentCanceled = () => {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen">
    <svg className="text-red-500 w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 0 0-2 0v5a1 1 0 0 0 2 0V6zm0 6a1 1 0 0 0-2 0v1a1 1 0 0 0 2 0v-1z" clip-rule="evenodd" />
    </svg>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Canceled</h1>
    <p className="text-gray-600 mb-4">We're sorry, but your payment was canceled. Please try again.</p>
    <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back to Home</Link>
  </div>
  )
}

export default PaymentCanceled