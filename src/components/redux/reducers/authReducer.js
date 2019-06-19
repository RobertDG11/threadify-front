import axios from "axios";

import {
  AUTHENTICATE,
  DEAUTHENTICATE,
  GET_SESSION,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
} from "../constants/index";

const initialState = {
  isAuth: false,
  user: {},
  token: "",
  successMessage: "",
  errorMessage: ""
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload,
        errorMessage: ""
      };
    case DEAUTHENTICATE:
      return {
        ...initialState
      };
    case GET_SESSION:
      const isAuth =
        action.payload && action.payload.data && action.payload.data.activated;
      console.log(action.payload.data);
      return {
        ...state,
        isAuth,
        user: action.payload.data
      };
    case SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}

export const getSession = () => async (dispatch, getState) => {
  await dispatch({
    type: GET_SESSION,
    payload: await axios.get("/account")
  });
};

export const login = (username, password, rememberMe = false) => async (
  dispatch,
  getState
) => {
  try {
    const result = await axios.post("/authenticate", {
      username,
      password,
      rememberMe
    });
    const bearerToken = result.headers.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === "Bearer ") {
      const jwt = bearerToken.slice(7, bearerToken.length);
      dispatch({
        type: AUTHENTICATE,
        payload: jwt
      });
    }
    dispatch(succesMessage("Te-ai autentificat cu succes"));
    await dispatch(getSession());
    return result;
  } catch (e) {
    console.log(e);
    dispatch(errorMessage(e.response.data.detail));
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: DEAUTHENTICATE
  });
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
  dispatch(logout());
};

export const succesMessage = payload => {
  return {
    type: SUCCESS_MESSAGE,
    payload
  };
};

export const errorMessage = payload => {
  return {
    type: ERROR_MESSAGE,
    payload
  };
};

export default authReducer;
