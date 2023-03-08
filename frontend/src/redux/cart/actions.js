import { baseURL } from "../../utils/url";
import axios from "axios";
import {
  ADD_CART_ERROR,
  ADD_CART_LOADING,
  ADD_CART_SUCCESS,
  DELETE_FROM_CART,
  EMPTY_CART,
  GET_CART_ERROR,
  GET_CART_LOADING,
  GET_CART_SUCCESS,
  UPDATE_CART,
} from "./actionTypes";
import { Toast, useToast } from "@chakra-ui/react";

const token = localStorage.getItem("token");

export const get_cart = () => async (dispatch) => {
  dispatch({ type: GET_CART_LOADING });
  try {
    let res = await axios.get(`${baseURL}/cart`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: GET_CART_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CART_ERROR });
  }
};

export const add_to_cart = (data) => async (dispatch) => {
  dispatch({ type: ADD_CART_LOADING });
  try {
    let res = await axios({
      method: "post",
      baseURL,
      url: "cart/add",
      headers: {
        Authorization: token,
      },
      data,
    });
    alert("SUCCSS, product added to cart");
    dispatch({ type: ADD_CART_SUCCESS, payload: res.data });
  } catch (err) {
    alert("product is in cart already");
    console.log(err);
    dispatch({ type: ADD_CART_ERROR, payload: err });
  }
};

export const update_cart = (id, data) => async (dispatch) => {
  try {
    let res = await axios({
      method: "patch",
      baseURL,
      url: `cart/update/${id}`,
      headers: {
        Authorization: token,
      },
      data,
    });
    dispatch({ type: UPDATE_CART, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const delete_from_cart = (id) => async (dispatch) => {
  let res = await axios.delete(`${baseURL}/cart/delete/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  dispatch({ type: DELETE_FROM_CART, payload: id });
};

export const empty_cart = () => async (dispatch) => {
  dispatch({ type: EMPTY_CART });
};
