export interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  kilograms: number;
  price: number;
  sku: string;
  taxable: boolean;
  images: [image];
  body: object;
}

export interface image {
  asset: object;
}
