import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
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
    </div>
  );
}
