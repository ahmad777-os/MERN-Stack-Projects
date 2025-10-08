import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const item = action.item;
      // Check if item with same id and size exists
      const existingIndex = state.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingIndex >= 0) {
        // Update qty and price of existing item
        const updatedState = [...state];
        updatedState[existingIndex].qty += item.qty;
        updatedState[existingIndex].price += item.price;
        return updatedState;
      } else {
        // Add new item
        return [...state, item];
      }
    }

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "CLEAR":
      return [];

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
