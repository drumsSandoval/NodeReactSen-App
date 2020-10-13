import React, { useReducer, useEffect } from "react";
import authContext from "./index";
import authReducer from "./reducer";
import Api from "../../config/axios";
import tokenAuth from "../../config/token";
const AuthState = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined" && token) {
      dispatch({
        type: "INIT_SESSION",
        payload: token,
      });
    }
  }, []);

  const initialState = {
    token: "",
    auth: null,
    user: null,
    msg: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const _signup = async (data) => {
    try {
      const response = await Api.post("/api/users", data);
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: response.data.data.msg,
      });
    } catch (error) {
      dispatch({
        type: "SIGNUP_ERROR",
        payload: error.response.data.data.msg,
      });
    }
    setTimeout(() => {
      dispatch({
        type: "CLEAR_MESSAGES",
      });
    }, 3000);
  };

  const _login = async (data) => {
    try {
      const response = await Api.post("/api/auth", data);
      console.log(response.data.data.jwt);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.jwt,
      });
    } catch (error) {
      console.log(error.response.data.data.errors);
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.data.errors,
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_MESSAGES",
        });
      }, 3000);
    }
  };

  const _userAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await Api.get("/api/auth");
      dispatch({
        type: "USER_AUTH",
        payload: response.data.data.user,
      });
    } catch (err) {
      localStorage.removeItem("token");
      dispatch({
        type: "LOGIN_ERROR",
        payload: "Sesion invalida",
      });
    }
  };

  const _logOut = () => {
    dispatch({
      type: "LOG_OUT",
    });
  };

  return (
    <authContext.Provider
      value={{ ...state, _signup, _login, _userAuth, _logOut }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
