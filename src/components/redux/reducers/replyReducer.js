import axios from "axios";

import { ADD_REPLIES, GET_REPLIES } from "../constants/index";

import { toast } from "react-toastify";

const initialState = {
  replies: [],
  totalItems: 0,
  currentPage: 1,
  reply: {}
};

function replyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REPLIES:
      return {
        ...state,
        threads: [...state.threads, action.payload]
      };

    case GET_REPLIES:
      return {
        ...state,
        totalItems:
          state.totalItems + parseInt(action.payload.headers["x-total-count"]),
        replies: [...state.replies, ...action.payload.data],
        currentPage:
          parseInt(action.payload.headers["x-total-count"]) === 10
            ? state.currentPage++
            : state.currentPage
      };

    default:
      return state;
  }
}

export const getReplies = (page, size, postId) => async dispatch => {
  try {
    const result = await axios.get(
      `/replies/post/${postId}?page="${page}"&size=${size}`
    );

    dispatch({ type: GET_REPLIES, payload: result.data });
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const addReply = reply => async dispatch => {
  try {
    const result = await axios.post(`/replies`, reply);

    dispatch({ type: ADD_REPLIES, payload: result.data });
    //dispatch({ type: ADD_TAGS, payload: tags });
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export default replyReducer;
