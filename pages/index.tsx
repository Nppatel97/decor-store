import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Header from "../components/Header";
// import ProductsList from "../components/ProductsList";
import client, { urlFor } from "../lib/config";
import { Product } from "../typings";
import { useState } from "react";

interface Props {
  products: [Product];
}
export default function Home({ products }: Props) {
  const [like, setLike] = useState(false);

  // console.log(products[0].kilograms);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Decor Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Header */}
      <div className="md:flex font-serif">
        <div className="flex flex-col justify-center bg-gray-800 lg:w-2/4 p-6 lg:p-12">
          <h1 className="text-white text-lg lg:text-2xl py-1 lg:py-4">
            <span className="underline decoration-1 text-4xl lg:text-7xl">
              Home Decor
            </span>
            <br />
            Style your home to Soothe your heart.
          </h1>
          <h4 className="text-gray-300 py-1 lg:py-4">
            Bring home the best in style decor. Choose from our New Funiture in
            stock including sofas, chairs, beds and a lot more! Discover our
            products to build your dream home. <br /> Recieve 20% off on your
            First Order!
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

      <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((prod, i) => (
          <div className="group max-w-sm bg-white hover:shadow-md overflow-hidden flex flex-col justify-between">
            <img
              key={i}
              className="group-hover:scale-105 transition duration-200 ease-in-out"
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

                <button className="my-1 mr-1 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-black bg-gray-100 rounded-full hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition duration-300 ease-in-out">
                  <span className="flex space-x-2 items-center">
                    <span>Add to Cart</span> <FaOpencart className="text-xl" />
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
