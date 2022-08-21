import router from "next/router";
import React, { useContext } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsShieldLockFill } from "react-icons/bs";
import Header from "../components/Header";
import { CartProduct } from "../typings";
import { CartContext } from "../components/store";

export default function checkout() {
  const cartCtx = useContext(CartContext);

  const addItemHandler = (product: CartProduct) => {
    const productInCart: CartProduct = {
      ...product,
      quantity: 1,
    };
    cartCtx.addToCart(productInCart);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="md:flex md:space-x-5 relative py-5">
        {/* Main left side */}
        <div className="md:w-2/4 lg:w-3/4 bg-white">
          <h1 className="text-2xl px-5 font-semibold">Your Shopping Cart</h1>
          {cartCtx.items.length !== 0 ? (
            cartCtx.items.map((el, i) => (
              // Cart Item
              <li
                key={i}
                className="flex border-b border-gray-200 relative justify-between space-x-8 items-center px-5 py-3"
              >
                {
                  // Image
                  <div className="md:flex md:space-x-2 items-center py-2">
                    <div>
                      <img
                        src={el.image}
                        className="w-48 object-cover rounded-sm"
                      />
                    </div>
                    {/* Title, Quantity, Price, Edit Stuff */}
                    <div className="text-xl md:px-4 pt-4">
                      <b>
                        {el.quantity} {el.title}
                        {el.quantity > 1 ? "s" : ""}
                      </b>{" "}
                      <p className="text-sm">${el.price}.00 each</p>{" "}
                      <p className="text-sm pb-4">SKU: {el.sku}</p>{" "}
                      {/* Update and Delete buttons */}
                      <div className="flex text-sm ">
                        <div key={i} className="text-sm flex items-center">
                          Change Quantity
                          <div
                            className="py-1 px-3 cursor-pointer"
                            onClick={() => cartCtx.removeFromCart(el)}
                          >
                            <BiMinus />
                          </div>
                          <div className="py-1 px-3 border border-gray-100 bg-white">
                            {el.quantity}
                          </div>
                          <div
                            className="py-1 px-3 cursor-pointer"
                            onClick={() => addItemHandler(el)}
                          >
                            <BiPlus />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            cartCtx.removeFromCheckout(el);
                          }}
                          className="border-l font-semibold text-red-700 border-gray-200 px-4 py-1 hover:text-red-500 transition duration-200 ease-in-out"
                        >
                          {" "}
                          Remove
                        </button>
                      </div>
                      {/* Change Quantity */}
                    </div>
                  </div>
                }{" "}
                {/* Total Price */}
                <p className="text-lg absolute top-40 md:top-20 lg:bottom-4 right-4">
                  ${el.price * el.quantity}.00
                </p>
              </li>
            ))
          ) : (
            <div className="px-5 py-8 text-gray-400 flex justify-center flex-col">
              <i className="text-3xl">Your cart is empty. Let's change that!</i>
              <button
                onClick={() => router.push("/products")}
                className="bg-gray-800 rounded-full px-8 pt-2 pb-3 w-max font-semibold text-gray-200 my-5"
              >
                Shop Now
              </button>
            </div>
          )}
        </div>
        <div className="md:w-2/4 lg:w-1/4 my-3 bg-gray-200 md:sticky md:right-0 md:top-20 text-xl h-96 p-5 flex flex-col md:rounded-md">
          <b className="mx-auto pt-2 pb-5">Your Order Details</b>
          <span>
            Subtotal: <b>${cartCtx.totalPrice}.00</b>
          </span>
          <span>
            Total Items: <b>{cartCtx.totalQty}</b>
          </span>
          <p className="text-sm py-2">
            Your Items will ship in approximately 1-2 weeks. You will receive an
            email once your items have been shipped.{" "}
          </p>
          <p className="text-sm pt-1 pb-2">
            Please note that shipping may be delayed due to poor logistics
            following COVID-19 pandemic.
          </p>
          <div className="absolute bottom-4 w-full left-0 px-4">
            <button
              className={`disabled:bg-gray-500 text-lg bg-gray-700 w-full py-2 items-center rounded-md text-white ${
                cartCtx.items.length === 0 ? "cursor-not-allowed" : ""
              }`}
              disabled={cartCtx.items.length === 0}
            >
              Pay and Confirm Order
            </button>
            <div className=" text-xs flex pt-2 space-x-1 items-center justify-center">
              <span className="text-sm">
                <BsShieldLockFill />
              </span>
              <small>Secure Payments Powered by Stripe</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
