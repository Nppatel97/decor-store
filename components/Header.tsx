import React, { useContext } from "react";
import { FaOpencart } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { CartContext, StateContext } from "../utils/store";
import { IoMdRemove } from "react-icons/io";

export default function Header() {
  // Router
  const router = useRouter();

  // Next Auth
  const { data: session } = useSession();

  // Handle header sub menus (Cart and Profile)
  const stateCtx = useContext(StateContext);
  // Populate cart
  const cartCtx = useContext(CartContext);

  return (
    <>
      {/* Navbaar */}
      <div className="z-50 flex space-x-5 px-5 justify-between items-center sticky top-0 bg-white">
        <div
          onClick={() => {
            stateCtx.logOutHandler(true);
            stateCtx.showCartHandler(true);
          }}
          className={`z-40 w-screen fixed top-0 left-0 h-screen bg-black opacity-30 ${
            stateCtx.btnSwitch[0] || stateCtx.btnSwitch[1] ? "" : "hidden"
          }`}
        ></div>
        {/* Logo and Menu */}
        <div className="flex space-x-5 items-center">
          <img
            onClick={() => {
              router.push("/");
            }}
            className="w-20 object-contain cursor-pointer"
            src="/Decor_Logo.png"
            alt="Logo"
          />
          <ul className="hidden md:flex space-x-5 ">
            <li
              className="cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                router.push("/products");
              }}
            >
              Products
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              About Us
            </li>
          </ul>
        </div>
        {/* Cart and Login */}
        <div>
          <ul className="flex space-x-5">
            <li
              className="pt-1 text-3xl text-gray-800 cursor-pointer"
              onClick={() => stateCtx.showCartHandler(false)}
            >
              <FaOpencart />
            </li>
            {stateCtx.btnSwitch[1] && (
              <div className="z-50 absolute top-16 right-6 pt-5 rounded-md bg-gray-50 border-2 border-gray-200 text-sm">
                {cartCtx.items.length !== 0 ? (
                  cartCtx.items.map((el, i) => (
                    <li
                      key={i}
                      className="flex justify-between space-x-8 items-center px-5"
                    >
                      {
                        <div className="flex space-x-2 items-center py-2">
                          <div>
                            <img
                              src={el.image}
                              className="w-14 object-cover rounded-sm"
                            />
                          </div>
                          <div>
                            <b>
                              {el.quantity} {el.title}
                              {el.quantity > 1 ? "s" : ""}
                            </b>{" "}
                            <p className="text-sm">${el.price}.00</p>{" "}
                          </div>
                        </div>
                      }{" "}
                      <span
                        onClick={() => {
                          cartCtx.removeFromCart(el);
                        }}
                        className="ml-4 p-1 m-1 cursor-pointer rounded-full bg-red-300 text-red-600"
                      >
                        <IoMdRemove />
                      </span>
                    </li>
                  ))
                ) : (
                  <div className="text-7xl p-8 text-gray-400 flex items-center justify-center flex-col">
                    <FaOpencart />
                    <i className="text-3xl">Let's Shop!</i>
                  </div>
                )}
                <div
                  className={`px-5 mt-4 flex space-x-5 justify-between text-gray-800 border-t border-gray-200 pt-4 ${
                    cartCtx.items.length === 0 ? "hidden" : ""
                  }`}
                >
                  <div>
                    Total Price: <b>${cartCtx.totalPrice}.00</b>{" "}
                  </div>
                  <div>
                    Total Items: <b>{cartCtx.totalQty}</b>{" "}
                  </div>
                </div>
                <div className="mt-4 p-1 flex space-x-5 justify-between">
                  <button
                    onClick={() => {
                      stateCtx.showCartHandler(true);
                      stateCtx.logOutHandler(true);
                      router.push("/checkout");
                    }}
                    className={`disabled:bg-gray-500 bg-gray-800 rounded-md w-full h-full p-3 font-bold text-white hover:bg-gray-700 transition ease-in-out duration-200 ${
                      cartCtx.items.length === 0 ? "cursor-not-allowed" : ""
                    }`}
                    disabled={cartCtx.items.length === 0}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
            {/* </li> */}
            <span className="absolute top-3 rounded-full px-2 bg-gray-200 text-sm">
              {cartCtx.totalQty}
            </span>
            <li className="pt-1 flex items-center">
              <span>
                {session && `Hi, ${session.user?.name?.split(" ")[0]}`}
              </span>
              <span className="cursor-pointer" onClick={() => signIn()}>
                {!session && `Login`}
              </span>
              {
                <img
                  className={`rounded-full cursor-pointer ${
                    session ? "mx-2 w-8" : ""
                  }`}
                  src={`${`${session?.user?.image}`}`}
                  alt=""
                  onClick={() => stateCtx.logOutHandler(false)}
                />
              }
            </li>
            <li
              className={`rounded-full bg-gray-800 text-white px-2 md:px-4 md:pt-1 md:pb-2 py-2 cursor-pointer ${
                session ? "hidden" : ""
              }`}
            >
              Sign Up
            </li>
            {stateCtx.btnSwitch[0] && (
              <li
                onClick={() => signOut()}
                className="z-50 absolute cursor-pointer text-black bg-gray-50 border-2 border-gray-100 px-8 py-2 rounded-md top-16 right-6"
              >
                Log Out
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
