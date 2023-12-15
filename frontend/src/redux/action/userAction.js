export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const doLogin = (res) => {
  return {
    type: FETCH_USER_LOGIN,
    payload: res,
  };
};
export const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};
export const setAccessToken = (access_token) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: access_token,
  };
};
