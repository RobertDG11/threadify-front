import {
  SHOW_CAROUSEL,
  MODIFY_ACTIVEITEMS,
  MODIFY_LOGINMODAL,
  ADD_REGISTER_SUCCES,
  DELETE_REGISTER_SUCCES,
  ADD_PROFESSORS
} from "../constants/index";

const initialState = {
  showCarousel: true,
  activeItem: "home",
  loginModal: {
    open: false,
    register: false
  },
  registerSucces: "",
  professors: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CAROUSEL:
      return {
        ...state,
        showCarousel: action.payload
      };
    case MODIFY_ACTIVEITEMS:
      return {
        ...state,
        activeItem: action.payload
      };
    case MODIFY_LOGINMODAL:
      return {
        ...state,
        loginModal: action.payload
      };
    case ADD_REGISTER_SUCCES:
      return {
        ...state,
        registerSucces: action.payload
      };
    case DELETE_REGISTER_SUCCES:
      return {
        ...state,
        registerSucces: ""
      };
    case ADD_PROFESSORS:
      return {
        ...state,
        professors: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;
