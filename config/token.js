import Api from "./axios";

const tokenAuth = (token) => {
  if (token) {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete Api.defaults.headers.common["Authorization"];
  }
};

export default tokenAuth;
