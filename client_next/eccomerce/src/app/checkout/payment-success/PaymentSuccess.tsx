import React from 'react'

const PaymentSuccess = () => {
  return (
    <>
    
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="relative">
      <svg className="text-green-500 w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 0 1-1.414-1.414L8.586 10 6.879 8.293a1 1 0 1 1 1.414-1.414l2.828 2.828a1 1 0 0 1 0 1.414l-4 4z" clip-rule="evenodd" />
      </svg>
      <div className="absolute top-0 right-0 mr-2 mt-2">
        <svg className="text-white bg-green-500 rounded-full w-6 h-6 p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v6zm0-4a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0v3z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
    <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
    <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out">Back to Home</a>
  </div>
    </>
  )
}

export default PaymentSuccess