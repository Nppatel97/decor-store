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
  removeFromCheckout: (item: CartProduct) => void;
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
  removeFromCheckout: (item: CartProduct) => {},
  changeQuantity: (operation: boolean) => {},
});

// const item0 = {
//   _id: "510bf681-7313-4fd5-a9f2-0d8e7af02f47",
//   title: "Kitchen Sink",
//   sku: "1221-436-765",
//   image:
//     "https://cdn.sanity.io/images/ie8fa606/production/8c0f54fcff4e46a284a12798a2d0d0d67bca95c7-1920x1277.jpg",
//   price: 2799,
//   quantity: 1,
// };

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

  const removeFromCheckout = (item: CartProduct) => {
    setItems((prevItems) => {
      if (prevItems.find((el) => el._id === item._id)) {
        setTotalPrice((prevPrice) =>
          prevPrice - item.price * item.quantity < 0
            ? 0
            : prevPrice - item.price * item.quantity
        );
        setTotalQty((prevQty) =>
          prevQty - item.quantity < 0 ? 0 : prevQty - item.quantity
        );
      }
      return prevItems.filter((el) => el._id !== item._id);
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
    removeFromCheckout,
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
  btnSwitch: [false, false, false],
  logOutHandler: (isOpen: boolean) => {},
  showCartHandler: (isOpen: boolean) => {},
});

export const StateContextProvider = (props: Props) => {
  // States to show/hide logout and cart
  // [logout, cart, checkout item update thing]
  const [btnSwitch, setBtnSwitch] = useState<boolean[]>([false, false, false]);

  // Logout Handler
  const logOutHandler = (isOpen: boolean) => {
    if (isOpen) {
      setBtnSwitch([false, false]);
    } else {
      setBtnSwitch([!btnSwitch[0], false]);
    }
  };
  // Cart Handler
  const showCartHandler = (isOpen: boolean) => {
    if (isOpen) {
      setBtnSwitch([false, false, false]);
    } else {
      setBtnSwitch([false, !btnSwitch[1]]);
    }
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
