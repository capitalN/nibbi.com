// import * as types from "./cart.types";

import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  EMPTY_CART,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_SUCCESS,
  UPDATE_CART,
} from "./actionTypes";

const initialState = {
  CART: [],
  loading: false,
  error: false,
};

export const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CART_SUCCESS: {
      return {
        ...state,
        CART: payload,
        loading: false,
      };
    }
    case GET_CART_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case GET_CART_ERROR: {
      return {
        ...state,
        CART: payload,
        loading: false,
        error: true,
      };
    }

    case ADD_TO_CART: {
      return {
        ...state,
        loading: false,
      };
    }
    case UPDATE_CART: {
      let updated = state.CART.map((el) => {
        if (el.id === payload.id) {
          return payload;
        }
        return el;
      });
      return {
        ...state,
        CART: updated,
      };
    }
    case DELETE_FROM_CART: {
      let filtered = state.CART.filter((el) => el._id !== payload);
      return {
        ...state,
        CART: filtered,
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        CART: [],
      };
    }
    default:
      return state;
  }
};
