import React, { useEffect, useState } from "react";
// import client from "../lib/sanity.server";
import { Product } from "../typings";

interface Props {
  products: [Product];
}
export default function ProductsList({ products }: Props) {
  console.log(products);
  return (
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type=="product"]{
    _id,
    title,
    defaultProductVariant,
    variants,
    slug
  }`;

  // const products = await client.fetch(query);

  return {
    props: {
      // products,
    },
  };
};
