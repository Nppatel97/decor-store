import Header from "../../components/Header";
import sanityClient, { urlFor } from "../../lib/config";
import { Product } from "../../typings";
import { GetStaticProps } from "next";

interface Props {
  product: Product;
}

function Post({ product }: Props) {
  console.log(product);
  return (
    <main>
      <Header />
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
