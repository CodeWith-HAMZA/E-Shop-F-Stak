import Link from 'next/link'
import React from 'react'

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white bg-green-500 rounded-full " fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  >
     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
   </svg>
   
   
     <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h1>
     <p className="text-gray-600 mb-4 text-center">Thank you for your payment. Your transaction was successful.</p>
     <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back to Home</Link>
   </div>
   

  )
}

export default PaymentSuccess