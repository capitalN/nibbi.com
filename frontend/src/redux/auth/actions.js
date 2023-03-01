import { baseURL } from "../../utils/url";
import axios from "axios";
import { USER_LOGIN, USER_REGISTER } from "./actionTypes";

export const user_register = (data) => async (dispatch) => {
  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/register`,
      data: { name: "anna", email: "anna@gmail.com", password: "anna" },
    });
    dispatch({
      type: USER_REGISTER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const user_login = (data) => async (dispatch) => {
  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/login`,
      data: { email: "anna@gmail.com", password: "anna" },
    });
    console.log(res.data);
    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
