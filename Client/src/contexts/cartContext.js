import React, { useState } from "react";

export const CartContext = React.createContext({
  state: {},
  setCart: () => {},
  addOneProductToCart: () => {},
  removeOneProductFromCart: () => {},
  deleteProductFromCart: () => {},
  setAmountOfProductToCart: () => {},
  addAmountOfProductToCart: () => {},
  MAX_AMOUNT: 0,
});

export const CartContextProvider = (props) => {
  const [state, setState] = useState({ cart: {} });

  const setCart = (cart) => {
    setState({ ...state, cart });
  };

  const addOneProductToCart = (productId) => {
    const currCart = { ...state.cart };
    if (!currCart[productId]) currCart[productId] = { amount: 1 };
    else currCart[productId].amount++;
    setState({ ...state, cart: { ...currCart } });
  };

  const removeOneProductFromCart = (productId) => {
    const currCart = { ...state.cart };
    if (currCart[productId] && currCart[productId].amount > 0)
      currCart[productId].amount--;
    setState({ ...state, cart: { ...currCart } });
  };

  const deleteProductFromCart = (productId) => {
    const currCart = { ...state.cart };
    if (currCart[productId]) delete currCart[productId];
    setState({ ...state, cart: { ...currCart } });
  };

  const setAmountOfProductToCart = (productId, amount) => {
    const currCart = { ...state.cart };
    currCart[productId] = { amount };
    setState({ ...state, cart: { ...currCart } });
  };

  const addAmountOfProductToCart = (productId, amount) => {
    const currCart = { ...state.cart };
    if (!currCart[productId]) currCart[productId] = { amount };
    else currCart[productId].amount += amount;
    setState({ ...state, cart: { ...currCart } });
  };

  const ctxValue = {
    state,
    setCart,
    addOneProductToCart,
    removeOneProductFromCart,
    deleteProductFromCart,
    setAmountOfProductToCart,
    addAmountOfProductToCart,
    MAX_AMOUNT: 5,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      {props.children}
    </CartContext.Provider>
  );
};
