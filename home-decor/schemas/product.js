export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    },
    {
      title: "Weight (in Kilograms)",
      name: "kilograms",
      type: "number",
    },
    {
      title: "Dimensions",
      name: "dimensions",
      type: "string",
    },
    {
      title: "Finish",
      name: "finish",
      type: "string",
    },
    {
      title: "Care Instructions",
      name: "maintain",
      type: "string",
    },
    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "SKU",
      name: "sku",
      type: "string",
    },
    {
      title: "Taxable",
      name: "taxable",
      type: "boolean",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    // {
    //   title: "Bar code",
    //   name: "barcode",
    //   type: "barcode",
    // },
    {
      name: "vendor",
      title: "Vendor",
      type: "reference",
      to: { type: "vendor" },
    },
    {
      name: "blurb",
      title: "Blurb",
      type: "localeString",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],

  preview: {
    select: {
      title: "title",
      manufactor: "manufactor.title",
    },
  },
};
