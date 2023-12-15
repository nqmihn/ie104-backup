import { INCREMENT, DECREMENT } from "../action/counterAction";
const INITIAL_STATE = {
  count: 0,
  name: "",
};
const countReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default countReducer;
