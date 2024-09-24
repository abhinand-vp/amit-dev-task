import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-200 to-green-500">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaCheckCircle className="text-green-500 w-16 h-16 animate-ping absolute inline-flex opacity-75" />
            <FaCheckCircle className="text-green-500 w-16 h-16" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Order Confirmed!.
        </p>

        <button
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
        >
          Conform your Orders
        </button>
      </div>
    </div>
  );
}
