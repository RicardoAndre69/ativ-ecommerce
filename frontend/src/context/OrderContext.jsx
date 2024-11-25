import React, { createContext, useContext, useReducer } from 'react';

const OrderContext = createContext();

const initialState = {
  orders: [],
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);