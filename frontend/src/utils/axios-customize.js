import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import { doLogout, setAccessToken } from "../redux/action/userAction";
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});
const handleRefreshToken = async () => {
  const res = await instance.post("/api/v1/auth/refresh");
  if (res && res.data) {
    return res.data.access_token;
  } else return null;
};
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = "Bearer " + access_token;
    NProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    NProgress.start();
    // Do something with request error
    return Promise.reject(error);
  }
);
const NO_RETRY_HEADER = "x-no-retry";
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    NProgress.done();

    if (
      error.response.data &&
      error.response.data.statusCode === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      // window.location.href = "/login";
      const access_token = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        store.dispatch(setAccessToken(access_token));
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return axios.request(error.config);
      }
      // else {
      //   window.location.href = "/login";
      // }
    }
    if (
      error.config &&
      error.response.data &&
      error.response.data.statusCode === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      // window.location.href = "/login";
      store.dispatch(doLogout());
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
