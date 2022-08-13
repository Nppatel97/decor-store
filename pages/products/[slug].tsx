import Header from "../../components/Header";
import sanityClient, { urlFor, config } from "../../lib/config";
import { Product } from "../../typings";
import { GetStaticProps } from "next";
import { FaOpencart } from "react-icons/fa";
import PortableText from "react-portable-text";

interface Props {
  product: Product;
}

function Post({ product }: Props) {
  return (
    <main className="max-w-7xl mx-auto">
      <Header />

      <div className="group relative w-full h-96 cursor-pointer">
        <img
          src={urlFor(product.images[0]).url()!}
          alt={`Image for ${product.title}`}
          className="w-full h-96 object-cover mx-auto absolute"
        />
        <div className="opacity-0 w-full h-96 group-hover:opacity-50 bg-black flex justify-start items-end absolute transition duration-200 ease-in-out">
          <span className="p-5 font-bold text-white">
            Click to View All Images
          </span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto p-5">
        <div className="md:flex justify-between pt-6 items-start">
          <div>
            <h1 className="text-xl uppercase font-bold">{product.title}</h1>
            <h5>{product.price}.00 CAD</h5>
            <div className="pt-6">
              <h2 className="font-bold">Sold By</h2>
              <div className="flex space-x-1 items-center">
                <img
                  src={urlFor(product.vendor.logo).url()}
                  alt={`Logo for Vendor: ${product.vendor.title}`}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <i>{product.vendor.title}</i>
              </div>
            </div>
          </div>
          <div>
            <button className="my-4 md:my-1 mr-1 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-black bg-gray-100 rounded-full hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 transition duration-300 ease-in-out">
              <span className="flex space-x-2 items-center">
                <span>Add to Cart</span> <FaOpencart className="text-xl" />
              </span>
            </button>
          </div>
        </div>

        <div className="pt-6 pb-12">
          <h2 className="font-bold">Product Overview</h2>
          <PortableText
            dataset={config.dataset}
            projectId={config.projectId}
            content={product.body}
            className=""
          />
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Product Details
                </th>
                <th scope="col" className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  Weight {`(In Kilograms)`}
                </th>
                <td className="py-4 px-6">{product.kilograms} Kgs</td>
              </tr>
              <tr className="bg-gray-50 border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  SKU
                </th>
                <td className="py-4 px-6">{product.sku}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  Taxable
                </th>
                <td className="py-4 px-6">{product.taxable ? "Yes" : "No"}</td>
              </tr>
              <tr className="bg-gray-50 border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  Dimensions {`(In inches)`}
                </th>
                <td className="py-4 px-6">{product.dimensions}</td>
              </tr>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  Finish
                </th>
                <td className="py-4 px-6">{product.finish}</td>
              </tr>
              <tr className="bg-gray-50 border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  Care Instructions
                </th>
                <td className="py-4 px-6">{product.maintain}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="product"]{
    _id,
    slug {
    current
  }
  }`;

  const products = await sanityClient.fetch(query);

  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="product" && slug.current == $slug][0]{
    _id,
    title,
    kilograms,
    price,
    sku,
    taxable,
    images,
    dimensions,
    maintain,
    finish,
    vendor -> {title, logo},
    body
  }`;

  const product = await sanityClient.fetch(query, { slug: params?.slug });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};
