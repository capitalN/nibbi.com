import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
} from "./actionTypes";

const initialState = {
  PRODUCTS: [],
  loading: false,
  error: false,
  payload: "",
};

export const ProductReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        PRODUCTS: payload,
        loading: false,
        error: false,
      };
    }
    case GET_PRODUCTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
