import axios from "axios";

import {
  ADD_THREAD,
  DELETE_THREAD,
  UPDATE_THREAD,
  GET_THREADS,
  RESET_POSTS,
  GET_THREAD,
  CREATE_THREAD
} from "../constants/index";

import { toast } from "react-toastify";
import { joinGroup } from "../reducers/authReducer";

const initialState = {
  threads: [],
  totalItems: 0,
  currentPage: 1,
  thread: {},
  openModal: false
};

function threadReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_THREAD:
      return {
        ...state,
        threads: [...state.threads, action.payload]
      };
    case DELETE_THREAD:
      return {
        ...state,
        threads: state.threads.filter(
          (_item, index) => index !== action.payload
        )
      };
    case UPDATE_THREAD:
      return {
        ...state,
        threads: state.threads.map(thread =>
          thread.id === action.payload.id ? (thread = action.payload) : thread
        )
      };
    case GET_THREADS:
      return {
        ...state,
        totalItems:
          state.totalItems + parseInt(action.payload.headers["x-total-count"]),
        threads: [...state.threads, ...action.payload.data],
        currentPage:
          parseInt(action.payload.headers["x-total-count"]) === 10
            ? state.currentPage++
            : state.currentPage
      };
    case GET_THREAD:
      return {
        ...state,
        thread: action.payload.data
      };
    case CREATE_THREAD:
      return {
        ...state,
        openModal: !state.openModal
      };
    case RESET_POSTS:
      return {
        ...initialState,
        openModal: state.openModal
      };
    default:
      return state;
  }
}

export const getThreads = () => async dispatch => {
  try {
    const result = await axios.get(`/thread-models`);
    dispatch({ type: GET_THREADS, payload: result });
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const getThread = id => async dispatch => {
  try {
    const result = await axios.get(`/thread-models/${id}`);
    dispatch({ type: GET_THREAD, payload: result });
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const addThread = thread => async dispatch => {
  try {
    const result = await axios.post(`/thread-models`, thread);
    dispatch({ type: ADD_THREAD, payload: result.data });
    dispatch(joinGroup(result.data.ownerId, result.data.id));
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const resetPosts = () => dispatch => {
  dispatch({ type: RESET_POSTS });
};

export default threadReducer;
