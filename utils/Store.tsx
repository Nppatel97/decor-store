import React, { useState } from "react";
import { CartProduct } from "../typings";

// ---- Cart
type Cart = {
  items: CartProduct[];
  totalPrice: number;
  qty: number;
  totalQty: number;
  addToCart: (item: CartProduct) => void;
  removeFromCart: (item: CartProduct) => void;
  changeQuantity: (operation: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

// Cart Context
export const CartContext = React.createContext<Cart>({
  items: [],
  totalPrice: 0,
  qty: 1,
  totalQty: 0,
  addToCart: (item: CartProduct) => {},
  removeFromCart: (item: CartProduct) => {},
  changeQuantity: (operation: boolean) => {},
});

// Cart Context Provider
export const CartContextProvider = (props: Props) => {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // This Quantity is only to use on Front-end. It will pass this value to the cartProduct quantity.
  const [qty, setQty] = useState<number>(1);
  const [totalQty, setTotalQty] = useState<number>(0);

  // Change Quantity
  const changeQuantityHandler = (operation: boolean) => {
    return operation
      ? setQty((prevQty) => (prevQty + 1 > 10 ? 10 : prevQty + 1))
      : setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  const addToCartHandler = (item: CartProduct) => {
    setQty(1);
    setTotalPrice((prevPrice) => prevPrice + item.price * item.quantity);
    setTotalQty((prevQty) => prevQty + item.quantity);
    setItems((prevItems) => {
      if (prevItems.find((el) => el._id === item._id)?.quantity == null) {
        return [...prevItems, item];
      } else {
        return prevItems.map((el) => {
          if (el._id === item._id) {
            return { ...el, quantity: el.quantity + item.quantity };
          } else {
            return el;
          }
        });
      }
    });
  };

  const removeFromCartHandler = (item: CartProduct) => {
    setTotalPrice((prevPrice) => prevPrice - item.price);
    setTotalQty((prevQty) => prevQty - 1);

    setItems((prevItems) => {
      if (prevItems.find((el) => el._id === item._id)?.quantity === 1) {
        return prevItems.filter((el) => el._id !== item._id);
      } else {
        return prevItems.map((el) => {
          if (el._id === item._id) {
            return { ...el, quantity: el.quantity - 1 };
          } else {
            return el;
          }
        });
      }
    });
  };

  const contextValue: Cart = {
    items,
    totalPrice,
    qty,
    totalQty,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    changeQuantity: changeQuantityHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
// ----- END Cart

// ---- Context for misc. states
export const StateContext = React.createContext({
  btnSwitch: [false, false],
  logOutHandler: () => {},
  showCartHandler: () => {},
});

export const StateContextProvider = (props: Props) => {
  // States to show/hide logout and cart
  const [btnSwitch, setBtnSwitch] = useState<boolean[]>([false, false]);

  // Logout Handler
  const logOutHandler = () => {
    setBtnSwitch([!btnSwitch[0], false]);
  };
  // Cart Handler
  const showCartHandler = () => {
    setBtnSwitch([false, !btnSwitch[1]]);
  };
  const contextValue = {
    btnSwitch,
    logOutHandler,
    showCartHandler,
  };
  return (
    <StateContext.Provider value={contextValue}>
      {props.children}
    </StateContext.Provider>
  );
};

// ----- END Misc. Context Provider
