import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaCross, FaOpencart, FaSink } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { CartContext } from "../utils/store";
import { IoMdRemove } from "react-icons/io";
import { MdChair } from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";

export default function Header() {
  // Router
  const router = useRouter();

  // Next Auth
  const { data: session } = useSession();

  // States to show/hide logout and cart
  const [btnSwitch, setBtnSwitch] = useState([false, false]);
  // Logout Handler
  const showLogOutHandler = () => {
    setBtnSwitch([!btnSwitch[0], false]);
  };
  // Cart Handler
  const showCartHandler = () => {
    setBtnSwitch([false, !btnSwitch[1]]);
  };
  // Populate cart
  const cartCtx = useContext(CartContext);

  return (
    <>
      {/* Navbaar */}
      <div className="z-50 flex space-x-5 px-5 justify-between items-center sticky top-0 bg-white">
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
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
          </ul>
        </div>
        {/* Cart and Login */}
        <div>
          <ul className="flex space-x-5">
            <li
              className="pt-1 text-3xl text-gray-800 cursor-pointer"
              onClick={showCartHandler}
            >
              <FaOpencart />
            </li>
            {btnSwitch[1] && (
              <div className="absolute top-16 right-6 py-5 rounded-md bg-gray-50 border-2 border-gray-200 text-sm">
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
                            <b>{el.title}</b>{" "}
                            <p className="text-sm">${el.price}.00</p>{" "}
                          </div>
                        </div>
                      }{" "}
                      <span
                        onClick={() => {
                          cartCtx.removeFromCart(i);
                        }}
                        className="ml-4 p-1 m-1 cursor-pointer rounded-full bg-red-300 text-red-600"
                      >
                        <IoMdRemove />
                      </span>
                    </li>
                  ))
                ) : (
                  <div className="text-7xl p-8 text-gray-400 flex items-center justify-center flex-col">
                    <span className="text-9xl rotate-45 text-gray-300 translate-y-5">
                      <MdChair />
                    </span>
                    {/* <span className="text-3xl -rotate-45 translate-x-6">
                      <RiPlantFill />
                    </span>
                    <span className="text-3xl rotate-45 -translate-y-14 -translate-x-6">
                      <FaSink />
                    </span> */}

                    <FaOpencart />
                    <i className="text-3xl">Let's Shop!</i>
                  </div>
                )}
              </div>
            )}
            {/* </li> */}
            <span className="absolute top-3 rounded-full px-2 bg-gray-200 text-sm">
              {cartCtx.items.length}
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
                  onClick={showLogOutHandler}
                />
              }
            </li>
            <li
              className={`rounded-full bg-gray-800 text-white px-4 pt-1 pb-2 cursor-pointer ${
                session ? "hidden" : ""
              }`}
            >
              Sign Up
            </li>
            {btnSwitch[0] && (
              <li
                onClick={() => signOut()}
                className="absolute cursor-pointer text-black bg-gray-50 border-2 border-gray-100 px-8 py-2 rounded-md top-16 right-6"
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
