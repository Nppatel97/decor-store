import React, { useState } from "react";
import { CartProduct } from "../typings";

type Cart = {
  items: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (i: number) => void;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<Cart>({
  items: [],
  addToCart: (item: CartProduct) => {},
  removeFromCart: (i: number) => {},
});

const CartContextProvider = (props: Props) => {
  const [items, setItems] = useState<CartProduct[]>([]);

  const addToCartHandler = (item: CartProduct) => {
    setItems((prevItems) => {
      return [...prevItems, item];
    });
  };

  const removeFromCartHandler = (i: number) => {
    setItems((prevItems) => {
      return prevItems.filter((el, pi) => pi !== i);
    });
  };

  const contextValue: Cart = {
    items,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
