import Link from "next/link";
import React from "react";
import { FaOpencart } from "react-icons/fa";

function Header() {
  return (
    <>
      {/* Navbaar */}
      <div className="flex space-x-5 px-5 justify-between items-center">
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

      {/* Header */}
      <div className="md:flex font-serif">
        <div className="flex flex-col justify-center bg-gray-800 lg:w-2/4 p-6 lg:p-12">
          <h1 className="text-white text-lg lg:text-2xl py-1 lg:py-4">
            <span className="underline decoration-1 text-4xl lg:text-7xl">
              Home Decor
            </span>
            <br />
            Style your home. Suit your heart.
          </h1>
          <h4 className="text-gray-300 py-1 lg:py-4">
            New Funiture in Stock! Bring home the best in style decor including
            sofas, chairs, beds and a lot more. Discover all our products <br />{" "}
            20% off on your First Order!
          </h4>
          <Link href={"/products"}>
            <span className="text-gray-800 rounded-full bg-white px-4 py-1 cursor-pointer w-max">
              Shop Now
            </span>
          </Link>
        </div>
        <div className="lg:w-2/4">
          <img
            className="object-contain"
            src="/img1.jpg"
            alt="Home Decor Header Image"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
