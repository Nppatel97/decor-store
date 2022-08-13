export interface Product {
  [x: string]: TypedObject;
  product: TypedObject;
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
  dimensions: string;
  finish: string;
  vendor: {
    title: string;
    logo: image;
    _id: string;
  };
  maintain: string;
  // tags: [string];
  body: object;
}

export interface image {
  asset: object;
}
