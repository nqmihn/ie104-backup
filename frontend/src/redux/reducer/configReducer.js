import { CHANGE_LANGUAGE, CHANGE_MODE } from "../action/configAction";

const INITIAL_STATE = {
  mode: "light",
  language: "en",
};
const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};

export default configReducer;
