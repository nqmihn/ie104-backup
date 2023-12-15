import {
  FETCH_USER_LOGIN,
  USER_LOGOUT_SUCCESS,
  SET_ACCESS_TOKEN,
} from "../action/userAction";
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    email: "",
    image: "",
    role: "",
    id: null,
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        account: {
          id: action?.payload?.data?.id,
          access_token: action?.payload?.data?.access_token,
          refresh_token: action?.payload?.data?.refresh_token,
          username: action?.payload?.data?.username,
          email: action?.payload?.data?.email,
          image: action?.payload?.data?.image,
          role: action?.payload?.data?.role,
        },
        isAuthenticated: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          email: "",
          image: "",
          role: "",
        },
        isAuthenticated: false,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        account: {
          access_token: action.payload,
        },
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default userReducer;
