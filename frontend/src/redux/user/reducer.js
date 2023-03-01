import { USER_LOGIN, USER_REGISTER } from "./actionTypes";

const initialState = {
  token: "",
  payload:"",
};

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER: {
      return {
        ...state,
        payload,
      };
    }
    case USER_LOGIN: {
      return {
        ...state,
        payload,
      };
    }
    default:
      return state;
  }
};
