import Link from "next/link";
import React from "react";
import { FaOpencart } from "react-icons/fa";

export default function Header() {
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
            <li className="pt-1">Login</li>
            <li className="rounded-full bg-gray-800 text-white px-4 pt-1 pb-2 cursor-pointer">
              Sign Up
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
