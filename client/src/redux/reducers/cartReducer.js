import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from "../types";

const initialState = {
  loading: true,
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        loading: false,
        cart: [payload, ...state.cart],
      };
    
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== payload),
        loading: false,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        loading: false,
      };
    default:
      return state;
  }
};
export default cartReducer;
