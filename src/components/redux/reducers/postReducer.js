import axios from "axios";

import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POSTS,
  RESET_POSTS,
  ADD_TAGS,
  GET_POST
} from "../constants/index";
import { LOCATION_CHANGE } from "react-router-redux";

import { toast } from "react-toastify";

const initialState = {
  posts: [],
  totalItems: 0,
  currentPage: 1,
  post: {}
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TAGS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload[0].id ? (post.tags = action.payload) : post
        )
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload
      };

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
          post.id === action.payload.postId ? (post = action.payload) : post
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
  threadId,
  postId
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
    } else if (type === "post") {
      result = axios.get(`/posts/${postId}`);
    }

    dispatch({ type: GET_POSTS, payload: result });
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const getPost = id => async dispatch => {
  try {
    const result = await axios.get(`/posts/${id}`);

    dispatch({ type: GET_POST, payload: result.data });
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const addPost = post => async dispatch => {
  try {
    const result = await axios.post(`/posts`, post);

    dispatch({ type: ADD_POST, payload: result.data });
    //dispatch({ type: ADD_TAGS, payload: tags });
    return result;
  } catch (e) {
    toast.error("Something happened! Please try again!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
};

export const addTags = tags => async dispatch => {
  try {
    const response = await axios.post("/tags/all", tags);

    dispatch({ type: ADD_POST, payload: response.data });

    return response;
  } catch (e) {
    // toast.error("Something happened! Please try again!", {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
};

export const resetPosts = () => dispatch => {
  dispatch({ type: RESET_POSTS });
};

export default postReducer;
