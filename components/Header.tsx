import Link from "next/link";
import React, { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { urlFor } from "../lib/config";

export default function Header() {
  const [logOut, setLogout] = useState(false);
  const { data: session } = useSession();
  const showLogOutHandler = () => {
    setLogout(!logOut);
  };
  return (
    <>
      {/* Navbaar */}
      <div className="z-50 flex space-x-5 px-5 justify-between items-center sticky top-0 bg-white">
        {/* Logo and Menu */}
        <div className="flex space-x-5 items-center">
          <Link href={"/"}>
            <img
              className="w-20 object-contain"
              src="/Decor_Logo.png"
              alt="Logo"
            />
          </Link>
          <ul className="hidden md:flex space-x-5 ">
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
          </ul>
        </div>
        {/* Cart and Login */}
        <div>
          <ul className="flex space-x-5">
            <li className="pt-1 text-3xl text-gray-800">
              <FaOpencart />
            </li>
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
            {logOut && (
              <li
                onClick={() => signOut()}
                className="fixed cursor-pointer text-black bg-gray-50 border-2 border-gray-100 px-8 py-2 rounded-md top-16 right-6"
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
