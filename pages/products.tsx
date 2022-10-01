import Link from "next/link";
import React, { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaOpencart } from "react-icons/fa";
import Header from "../components/Header";
import client, { urlFor } from "../lib/config";
import { CartProduct, Product } from "../typings";
import { CartContext, StateContext } from "../components/store";

interface Props {
  products: [Product];
}
export default function Products({ products }: Props) {
  const cartCtx = useContext(CartContext);

  const addItemHandler = (product: Product) => {
    const productInCart: CartProduct = {
      _id: product._id,
      title: product.title,
      sku: product.sku,
      image: urlFor(product.images[0]).url(),
      price: product.price,
      quantity: 1,
    };
    cartCtx.addToCart(productInCart);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center sm:justify-left">
        {products.map((prod, i) => (
          <div
            key={i}
            className="group lg:max-w-sm bg-white hover:shadow-md overflow-hidden flex flex-col justify-between"
          >
            <img
              key={i}
              className="group-hover:scale-105 transition duration-200 ease-in-out min-h-[53%]"
              src={urlFor(prod.images[0]).url()}
              alt=""
            />

            <div className="p-4">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {prod.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700">
                <b>${prod.price}.00</b>
                <br />
                <span>Weight: {prod.kilograms} Kgs</span>
                <br />
                <small>SKU: {prod.sku}</small>
              </p>
              <div className="md:flex justify-between">
                <Link key={i} href={`/products/${prod.slug.current}`}>
                  <span className="my-1 mr-1 cursor-pointer justify-center inline-flex space-x-2 items-center py-2 px-4 text-sm font-medium text-center text-white bg-gray-800 rounded-full hover:bg-gray-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 transition duration-300 ease-in-out">
                    <span>Details</span> <BsArrowRight />
                  </span>
                </Link>

                <button
                  onClick={() => {
                    addItemHandler(prod);
                  }}
                  className="my-1 mr-1 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-black bg-gray-100 rounded-full hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition duration-300 ease-in-out"
                >
                  <span className="flex space-x-2 items-center">
                    <span id={prod._id}>Add to Cart</span>{" "}
                    <FaOpencart id={prod._id} className="text-xl" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type=="product"]{
    _id,
    title,
    slug,
    taxable,
    sku,
    images,
    kilograms,
    price,
    body
  }`;

  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
  };
};
