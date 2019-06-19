import { LOAD_LITERALS } from "../constants/index";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_LITERALS:
      return action.payload;
    default:
      return state;
  }
};
