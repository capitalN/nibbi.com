import { baseURL } from "../../utils/url";
import axios from "axios";
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  EMPTY_CART,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_SUCCESS,
  UPDATE_CART,
} from "./actionTypes";

const token = localStorage.getItem("token");

export const get_cart = () => async (dispatch) => {
  dispatch({ type: GET_CART_LOADING });
  try {
    let res = await axios.get(`${baseURL}/cart`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res.data);
    dispatch({ type: GET_CART_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_CART_ERROR });
  }
};

export const add_to_cart = (product) => async (dispatch) => {
  try {
    let res = await axios({
      method: "post",
      baseURL,
      url: "cart/add",
      headers: {
        Authorization: token,
      },
      body: product,
    });
    console.log(res);
    dispatch({ type: ADD_TO_CART, payload: res.data });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const update_cart =
  ({ id, a }) =>
  async (dispatch) => {
    let res = await axios.patch(`${baseURL}/cart/${id}`, { count: a });
    dispatch({ type: UPDATE_CART, payload: res.data });
  };

export const delete_from_cart = (id) => async (dispatch) => {
  let res = await axios.delete(`${baseURL}/cart/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(res.data);
  dispatch({ type: DELETE_FROM_CART, payload: id });
};

export const empty_cart = () => async (dispatch) => {
  dispatch({ type: EMPTY_CART });
};
