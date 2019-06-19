import { ADD_FIELD, REMOVE_FIELD } from "../constants/index";

const initialState = {
  fields: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        fields: [...state.fields, action.payload]
      };
    case REMOVE_FIELD:
      return {
        ...state,
        fields: []
      };

    default:
      return state;
  }
}

export default rootReducer;
