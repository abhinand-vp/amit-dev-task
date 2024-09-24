'use client'

import { useRouter } from 'next/navigation'
import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailed: React.FC = () => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-200 to-red-500">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
=        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaTimesCircle className="text-red-500 w-16 h-16 animate-bounce absolute inline-flex opacity-75" />
            <FaTimesCircle className="text-red-500 w-16 h-16" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment Failed!
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment was not successful. Please try again.
        </p>

        <button
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300"
          onClick={() => router.push('/')}
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
