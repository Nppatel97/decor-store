import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

const initialState = {
  id: "",
  addedToCart: false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems")!)
      : [],
  },
};

export const Store = createContext<any>(initialState);

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        addedToCart: true,
        id: action.payload,
      };
    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
