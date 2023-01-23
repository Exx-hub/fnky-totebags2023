export type FixMeLater = any;

export interface IProduct {
  _doc: FixMeLater;
  name: string;
  sku: string;
  bagImage: string;
  patternImage: string;
  price: string;
  description: string;
  _id: string;
}

export interface PopulatedItem {
  productId: IProduct; // productId because saved as a ref at first then populated into full product
  quantity: number;
  _id: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
  cart: FixMeLater[];
  wishlist: FixMeLater[];
}

export interface OrderProduct {
  quantity: number;
  _id: string;
  product: {
    name: string;
    sku: string;
    bagImage: string;
    patternImage: string;
    price: string;
    description: string;
    _id: string;
  };
}

export interface IOrderItem {
  products: OrderProduct[];
  user: {
    email: string;
    userId: string;
  };
  _id: string;
}
