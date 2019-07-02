import axios from "axios";

import {
  AUTHENTICATE,
  DEAUTHENTICATE,
  GET_SESSION,
  GET_FRIENDS,
  GET_GROUPS,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  JOIN_GROUP,
  LEAVE_GROUP,
  UPDATE_GROUP
} from "../constants/index";

import { toast } from "react-toastify";
import { getThread } from "./threadReducer";

const initialState = {
  isAuth: false,
  user: {},
  friends: [],
  groups: [],
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
      return {
        ...state,
        isAuth,
        user: action.payload.data
      };
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload.data
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload.data
      };

    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload.id ? (group = action.payload) : group
        )
      };

    case JOIN_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload]
      };
    case LEAVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.payload.id)
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
  const response = await axios.get("/account");
  await dispatch({
    type: GET_SESSION,
    payload: response
  });

  await dispatch({
    type: GET_FRIENDS,
    payload: await axios.get(`/friends/${response.data.login}`)
  });

  await dispatch({
    type: GET_GROUPS,
    payload: await axios.get(`/groups/${response.data.login}`)
  });
};

export const joinGroup = (user, thread) => async dispatch => {
  try {
    const response = await axios.put(
      `/group-models/user/${user}/thread/${thread}`
    );
    dispatch({
      type: JOIN_GROUP,
      payload: response.data
    });
    dispatch(getThread(thread));
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const leaveGroup = (user, thread) => async dispatch => {
  try {
    const response = await axios.delete(
      `/group-models/user/${user}/thread/${thread}`
    );

    dispatch({
      type: LEAVE_GROUP,
      payload: response.data
    });
    dispatch(getThread(thread));
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const updateGroup = (threadId, users) => async dispatch => {
  try {
    const response = await axios.put(`/group-models/${threadId}`, users);

    console.log(response.data);
    dispatch({
      type: UPDATE_GROUP,
      payload: response.data
    });
    dispatch(getThread(threadId));
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
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
