'use client'
 
import { useForm, useFormState } from "react-hook-form";
import { CartItem, useCartStore } from "../store/cartStore";
import { countries } from "@/utilities/countriesArray";
import axios from "axios";
import api from "@/services/api";
import { BiColor } from "react-icons/bi";

const Checkout = () => {
const {cartItems, subTotal}= useCartStore((state) => state); 

const {
    register,
    handleSubmit, 
    formState ,
  } = useForm();
  async function onSubmit(data: unknown) {
    if(Number(subTotal)){
        console.log(cartItems)
        console.log( cartItems.map((item) =>({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name, // Replace with the name of your product
                // Other product details if necessary
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          })));
        try {
            const {data}= await axios.post('http://localhost:5000/charge', {
                orderItems: cartItems,
                success_url: "http://localhost:3000/checkout/payment-success",  
                cancel_url: "http://localhost:3000/checkout/payment-cancel"
            })
            console.log(data.url)
            location.href = data.url

         } catch (error) {
            console.log("error", error)
        } 

    }
    console.log(data,    formState,  'euth');
  }

  return ( 
     
        <div className="h-screen grid grid-cols-3 pt-28" >
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                <div   className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                    <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                        <div className="text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-sm font-medium ml-3">Checkout</div>
                    </div>
                    <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                    <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                </div>
                <div className="rounded-md">
                    <form id="payment-form"  onSubmit={handleSubmit(onSubmit)}>
                        <section className="">
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping & Billing Information</h2>
                            <fieldset className="mb-3 bg-white shadow-lg rounded-md text-gray-600">
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Name</span>
                                    <input  {...register("name")} name="name" className="focus:outline-none px-3" placeholder="Try Odinsson"  />
                                </label>
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Email</span>
                                {/* <span className="px-2 text-gray-500 bg-gray-100 ">{"hs5924414@gmail.com"}</span> */}
                                <input  className="px-2 focus:outline-none" placeholder="Enter your email"/>

                                         </label>
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Address</span>
                                    <input  {...register("address")} name="address" className="focus:outline-none px-3" placeholder="10 Street XYZ 654"/>
                                </label>
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">City</span>
                                    <input  {...register("city")} name="city" className="focus:outline-none px-3" placeholder="Enter Your City"/>
                                </label>
                                <label className="inline-flex w-2/4 border-gray-200 py-3">
                                    <span className="text-right px-2">State</span>
                                    <input  {...register("state")} name="state" className="focus:outline-none px-3" placeholder="Enter Your State"/>
                                </label>
                                <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                                    <span className="text-right px-2 xl:px-0 xl:text-none">ZIP / Postal</span>
                                    <input {...register("zipCode")} name="zipCode" className="focus:outline-none px-3" placeholder="zip code"/>
                                </label>
                                <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                                    <span className="text-right px-2">Country</span>
                                    <div id="country" className="focus:outline-none px-3 w-full flex items-center">
                                        <select {...register("country")} name="country" className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none">
                                             {
                                                countries.map((country) => { 
                                                    return <option value={country.value}>{country.text}</option>
                                                })
                                             }
                                            
                                        </select>
                                    </div>
                                </label>
                            </fieldset>
                        </section>
                        <button type="submit" className="submit-button px-4 py-3 rounded-md bg-purple-500 hover:bg-purple-600 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                    Pay {subTotal}
                </button>
                        </form>
                </div>
                <div className="rounded-md">
                    {/* <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information</h2>
                        <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Card</span>
                                <input name="card" className="focus:outline-none px-3 w-full" placeholder="Card number MM/YY CVC"  />
                            </label>
                        </fieldset>
                    </section> */}
                </div>
                
            </div>
            <div className="col-span-1 bg-white lg:block hidden">
                <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
                <ul className="py-6 border-b space-y-6 px-8">
                   {cartItems. map(({name, images, price, quantity, description}: CartItem) => <li className="grid grid-cols-6 gap-2 border-b-1">
                        <div className="col-span-1 self-center">
                            <img src={images[0].url} alt="Product" className="rounded w-full"/>
                        </div>
                        <div className="flex flex-col col-span-3 pt-2">
                            <span className="text-gray-600 text-md font-semi-bold">{name}</span>
                            <span className="text-gray-400 text-sm inline-block pt-2">{description}</span>
                        </div>
                        <div className="col-span-2 pt-3">
                            <div className="flex items-center space-x-2 text-sm justify-between">
                                <span className="text-gray-400">{quantity} x {price}</span>
                                <span className="text-purple-400 font-semibold inline-block">{quantity * price}</span>
                            </div>
                        </div>
                    </li>)}
                   
                </ul>
                <div className="px-8 border-b">
                    <div className="flex justify-between py-4 text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold text-purple-500">{subTotal}</span>
                    </div>
                    <div className="flex justify-between py-4 text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold text-purple-500">Free</span>
                    </div>
                </div>
                <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                    <span>Total</span>
                    <span>{subTotal}</span>
                </div>
            </div>
        </div> 
  )
}

export default Checkout;


// .Card.elementor-widget-container {
//     background: #7a00ff;
// color: white;
// }