import { baseURL } from "../../utils/url";
import axios from "axios";
import { USER_LOGIN, USER_REGISTER } from "./actionTypes";

export const user_register = (data) => async (dispatch) => {
  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/register`,
      data,
    });

    dispatch({
      type: USER_REGISTER,
      payload: res.data,
    });
  } catch (error) {
    alert(error.response.data.msg);
  }
};

export const user_login = (data) => async (dispatch) => {
  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/login`,
      data,
    });
    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });
    console.log(res);
  } catch (error) {
    alert(error.response.data.msg);
  }
};
