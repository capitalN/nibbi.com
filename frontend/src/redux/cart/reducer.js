// import * as types from "./cart.types";

import {
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_SUCCESS,
  DELETE_FROM_CART,
  DELETE_FROM_CART_LOADING,
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
  payload: null,
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

    case ADD_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        CART: [...state.CART, payload],
      };
    }
    case ADD_CART_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
        payload,
      };
    }
    case ADD_CART_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        payload,
      };
    }

    case UPDATE_CART: {
      let updated = state.CART.map((el) => {
        if (el._id === payload._id) {
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
