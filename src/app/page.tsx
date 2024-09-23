"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type FormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: number;
};

const Home: React.FC = () => {
  const [proceedPayment, setProceedPayment] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setProceedPayment(true);
  };

  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 9.99 },
  ];

  const [cartItems, setCartItems] = useState(
    products.map((product) => ({
      ...product,
      quantity: 1,
    }))
  );

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
          }
          : item
      )
    );
  };

  const removeProduct = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="min-h-screen bg-gray-10 py-5">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center justify-center mb-8">
          <FaShoppingCart className="text-green-500 w-8 h-8 mr-3" />
          <h1 className="text-3xl font-semibold text-gray-800">Checkout</h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing Information</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none ${errors.fullName ? "border-red-500" : ""
                      }`}
                    placeholder="Enter your full name"
                    {...register("fullName", { required: "Full name is required" })}
                  />
                  {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none ${errors.email ? "border-red-500" : ""
                      }`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none ${errors.address ? "border-red-500" : ""
                      }`}
                    placeholder="Enter your address"
                    {...register("address", { required: "Address is required" })}
                  />
                  {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700">City</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none ${errors.city ? "border-red-500" : ""
                        }`}
                      placeholder="Enter your city"
                      {...register("city", { required: "City is required" })}
                    />
                    {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none ${errors.zipCode ? "border-red-500" : ""
                        }`}
                      placeholder="Enter your ZIP code"
                      {...register("zipCode", {
                        required: "ZIP code is required"
                      })}
                    />
                    {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="bg-gray-50 p-4 rounded-md shadow-inner">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">{item.name}</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, false)}
                        className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-blue-300 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, true)}
                        className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-blue-300 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <MdOutlineDelete size={25} />
                    </button>
                  </div>
                ))}

                <div className="flex justify-between border-t border-gray-300 pt-3">
                  <span className="text-gray-800 font-semibold">Total</span>
                  <span className="font-bold text-green-600">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {proceedPayment && (
              <><h2 className="text-xl font-semibold text-blue-500 mt-8 text-center mb-4">Pay the Payment</h2><Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubcurrency(totalAmount),
                  currency: "usd",
                }}
              >
                <CheckoutPage amount={totalAmount} />
              </Elements></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
