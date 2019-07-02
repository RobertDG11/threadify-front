import axios from "axios";

import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POSTS,
  RESET_POSTS
} from "../constants/index";
import { LOCATION_CHANGE } from "react-router-redux";

import { toast } from "react-toastify";

const initialState = {
  posts: [],
  totalItems: 0,
  currentPage: 1
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((_item, index) => index !== action.payload)
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? (post = action.payload) : post
        )
      };
    case GET_POSTS:
      return {
        ...state,
        totalItems:
          state.totalItems + parseInt(action.payload.headers["x-total-count"]),
        posts: [...state.posts, ...action.payload.data],
        currentPage:
          parseInt(action.payload.headers["x-total-count"]) === 10
            ? state.currentPage++
            : state.currentPage
      };
    case RESET_POSTS:
      return initialState;
    default:
      return state;
  }
}

export const getPosts = (
  page,
  size,
  sort,
  type,
  threadId
) => async dispatch => {
  try {
    let result;
    if (type === "thread") {
      result = await axios.get(
        `/posts/thread/${threadId}?page="${page}"&size=${size}&sort=${sort}`
      );
    } else if (type === "front") {
      result = await axios.get(
        `/posts?page="${page}"&size=${size}&sort=${sort}`
      );
    }

    dispatch({ type: GET_POSTS, payload: result });
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

export default postReducer;
