import { baseURL } from "../../utils/url";
import axios from "axios";
import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
} from "./actionTypes";

export const get_products = (params) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_LOADING,
  });
  try {
    let res = await axios({
      method: "GET",
      baseURL,
      url: `products`,
      params,
    });
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_ERROR,
      payload: error,
    });
  }
};

export const get_searched_products = (params) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_LOADING,
  });
  try {
    let res = await axios({
      method: "GET",
      baseURL,
      url: `products/search`,
      params,
    });

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PRODUCTS_ERROR,
      payload: error,
    });
  }
};

export const get_single_product =
  ({ id }) =>
  async (dispatch) => {
    dispatch({
      type: GET_PRODUCTS_LOADING,
    });
    try {
      let res = await axios({
        method: "GET",
        baseURL,
        url: `products/${id}`,
      });
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: [res.data],
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: error,
      });
    }
  };
