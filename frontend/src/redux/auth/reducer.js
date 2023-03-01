import { USER_LOGIN, USER_REGISTER } from "./actionTypes";

let token = localStorage.getItem("token") || null;
let user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  token,
  isAuth: !!token,
  user,
};

export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER: {
      return {
        ...state,
        payload,
      };
    }
    case USER_LOGIN: {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      return {
        ...state,
        token: payload.token,
        payload,
        isAuth: true,
      };
    }
    default:
      return state;
  }
};
